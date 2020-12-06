import BookingUpdatePurchaseDateBamba from "./BookingUpdatePurchaseDateBamba";
import BookingInsertTransactionForReservationBamba from "./BookingInsertTransactionForReservationBamba";
import BookingPassengersBamba from "./BookingPassengersBamba";
import BookingPrepareDataBamba from "./BookingPrepareDataBamba";
import BookingBamba from "./BookingBamba";
import ReservationBamba from "./ReservationBamba";
import CalculatePriceBamba from "./CalculatePriceBamba";
import ChangeReservationStatusBamba from "./ChangeReservationStatusBamba";
import BookingModel from "../../models/BookingModel";
import ReservationStatusModel from "../../models/ReservationStatusModel";
import TourDetailModel from "../../models/TourDetailModel";
import XeroInvoiceBamba from "./XeroInvoiceBamba";
import XeroPurchaseBamba from "./XeroPurchaseBamba";
import XeroContactsBamba from "./XeroContactsBamba";

export default class BookingSyncBamba {
	constructor() {
		this.BookingUpdatePurchaseDateBamba = new BookingUpdatePurchaseDateBamba();
		this.BookingInsertTransactionForReservationBamba = new BookingInsertTransactionForReservationBamba();
		this.BookingPassengersBamba = new BookingPassengersBamba();
		this.BookingBamba = new BookingBamba();
		this.BookingPrepareDataBamba = new BookingPrepareDataBamba();
		this.ReservationBamba = new ReservationBamba();
		this.CalculatePriceBamba = new CalculatePriceBamba();
		this.ChangeReservationStatusBamba = new ChangeReservationStatusBamba();
		this.XeroInvoiceBamba = new XeroInvoiceBamba();
		this.XeroPurchaseBamba = new XeroPurchaseBamba();
		this.XeroContactsBamba = new XeroContactsBamba();
	}

	async syncBookingByBambaReservationID(BambaReservationID) {
		let Bookign = null;

		let BookignNotSync = await BookingModel.findOne({
			BambaReservationID: BambaReservationID,
		});

		if (!BookignNotSync) {
			throw new Error(
				`ERROR NO SE ENCONTRO BOOKING CON EL BAMBARESERVATIONID ${BambaReservationID}.`
			);
		}

		if (BookignNotSync.ReservationLemaxID) {
			console.log("ENTRA EN RESERVATION LEMAX ID");
			Bookign = await this.syncBookingByReservationID(
				BookignNotSync.ReservationLemaxID
			);
		} else {
			console.log("ENTRA EN BOOKING FROM LOCAL TO LEMAX");
			Bookign = await this.syncBookingFromLocalToLemax(BambaReservationID);
		}

		// primero revisamos si el contactID existe
		let xeroContact = null;
		if (Bookign.Customer) {
			xeroContact = await this.XeroContactsBamba.createIfNotExist(
				Bookign.Customer.PersonName,
				Bookign.Customer.Email,
				Bookign.Customer.CustomerID
			);
		}

		return Bookign;
	}

	/**
	 * Se encarga de sincronizar una reservación para guardar o actualizar algun booking existente con
	 * un ReservationLemaxID ya asociado
	 *
	 * @param {*} ReservationID
	 */
	async syncBookingByReservationID(ReservationID) {
		let bookingResponse = null;

		const reservationBamba = new ReservationBamba();
		const reservation = await reservationBamba.getReservation({
			ReservationID: ReservationID,
		});

		if (reservation) {
			const responseData = await this.BookingPrepareDataBamba.prepareDataForBookingCollection(
				reservation
			);

			if (responseData.ReservationLemaxID) {
				const BookignDB = await BookingModel.findOne({
					ReservationLemaxID: ReservationID,
				});

				if (BookignDB) {
					let PurchaseDate = await this.BookingUpdatePurchaseDateBamba.updateCustomPurchaseDate(
						ReservationID,
						true,
						BookignDB.Status,
						responseData.Status
					);

					if (PurchaseDate) {
						responseData.PurchaseDate = PurchaseDate;
					}
				}

				await BookingModel.deleteMany({
					ReservationLemaxID: responseData.ReservationLemaxID,
				});

				if (responseData.BambaReservationID) {
					await BookingModel.deleteMany({
						BambaReservationID: responseData.BambaReservationID,
					});
				}

				bookingResponse = await this.BookingBamba.insert(responseData);
			}
		}

		return bookingResponse;
	}

	/**
	 * Se usa en el caso de que el booking solamente exista en la base de datos en local y aun no existe una reservación
	 * en lemax asociada a este booking, por lo tanto se tiene que generar
	 *
	 * @param {*} BambaReservationID
	 */
	async syncBookingFromLocalToLemax(BambaReservationID) {
		let Booking = null;
		let BookignNotSync = await BookingModel.findOne({
			BambaReservationID: BambaReservationID,
		});

		if (!BookignNotSync) {
			throw new Error(
				`ERROR NO SE ENCONTRO BOOKING CON EL BAMBARESERVATIONID ${BambaReservationID}.`
			);
		}

		if (!BookignNotSync.ConfirmAndPayJson) {
			throw new Error(
				`EL BOOKING CON  ${BookignNotSync.BambaReservationID} NO CUENTRA CON JSON DE CONFIRM AND PAY.`
			);
		}

		if (!BookignNotSync.TourID) {
			throw new Error(
				`EL BOOKING CON  ${BookignNotSync.BambaReservationID} NO CUENTRA CON TOUR ID.`
			);
		}

		let Tour = await TourDetailModel.findOne({
			TourID: BookignNotSync.TourID,
		});

		if (!Tour) {
			throw new Error(
				`EL BOOKING CON  ${BookignNotSync.BambaReservationID} CON EL TOUR ${BookignNotSync.TourID} NO SE ENCUENTRA EN LA BASE DE DATOS.`
			);
		}

		let ReservationStatus = await ReservationStatusModel.findOne({
			lemaxId: global.constants.RESERVATION_STATUS_ID_SYNC_IN_PROCESS,
		});
		BookignNotSync.Status = ReservationStatus.lemaxId;
		BookignNotSync.StatusName = ReservationStatus.name;

		await BookignNotSync.save();

		// Recuperamos el precio de live para validar monto
		const CalculatePriceLive = await this.CalculatePriceBamba.calculatedPriceOld(
			BookignNotSync.BranchOffice ==
				global.constants.BRANCH_OFFICE_BOOKINGS_B2B_ID
				? true
				: false,
			JSON.parse(BookignNotSync.ConfirmAndPayJson.CalculatePriceJson)
		);

		if (!CalculatePriceLive) {
			throw new Error(`ERROR CALCULAR PRECIO LIVE .`);
		}

		if (!CalculatePriceLive.TotalPrice) {
			throw new Error(`ERROR CALCULAR PRECIO LIVE .`);
		}

		if (parseFloat(CalculatePriceLive.TotalPrice) == 0) {
			throw new Error(`ERROR CALCULAR PRECIO LIVE .`);
		}

		if (
			parseFloat(BookignNotSync.ConfirmAndPayJson.AmountCalculatePrice) == 0
		) {
			throw new Error(`ERROR AMOUNT CALCULATEPRICE JSON ES 0.`);
		}

		BookignNotSync.ConfirmAndPayJson.AdHocItems =
			BookignNotSync.ConfirmAndPayJson.AdHocItems || [];

		if (
			parseFloat(CalculatePriceLive.TotalPrice) !=
			parseFloat(BookignNotSync.ConfirmAndPayJson.AmountCalculatePrice)
		) {
			let AmountDiff =
				parseFloat(BookignNotSync.ConfirmAndPayJson.AmountCalculatePrice) -
				parseFloat(CalculatePriceLive.TotalPrice);

			let adHocDiff = {
				StartDate:
					BookignNotSync.ConfirmAndPayJson.ReservationItems[0].StartDate,
				EndDate: BookignNotSync.ConfirmAndPayJson.ReservationItems[0].EndDate,
				Passengers: await this.BookingPassengersBamba.getPassengersFake(
					BookignNotSync.ConfirmAndPayJson.ReservationItems[0].Passengers
				),
				Services: [
					{
						AdHocSellingPrice: AmountDiff,
						ServiceID: global.constants.ADHOC_SERVICE_ID,
						SupplierID: global.constants.ADHOC_SERVICE_ADHOCSELLINGPRICE,
					},
				],
			};

			BookignNotSync.ConfirmAndPayJson.AdHocItems.push(adHocDiff);
		}

		// ultimo paso - primero verificar si hay descunetos
		const reservationBamba = new ReservationBamba();

		let ResponseConfirmAndPay = null;

		try {
			ResponseConfirmAndPay = await reservationBamba.createReservation(
				true,
				BookignNotSync.ConfirmAndPayJson.CurrencyID,
				BookignNotSync.ConfirmAndPayJson.PaymentMethodID,
				BookignNotSync.ConfirmAndPayJson.LanguageID,
				BookignNotSync.ConfirmAndPayJson.Customer,
				BookignNotSync.ConfirmAndPayJson.ReservationItems,
				BookignNotSync.ConfirmAndPayJson.AdHocItems,
				BookignNotSync.ConfirmAndPayJson.CalculatePriceJson,
				BookignNotSync.ConfirmAndPayJson.AmountCalculatePrice,
				BambaReservationID,
				Tour.MajorRegion.CustomFieldValueID,
				Tour.PackageType.CustomFieldValueID,
				BookignNotSync.ConfirmAndPayJson.PNR,
				BookignNotSync.ConfirmAndPayJson.AgentReferenceNumber,
				BookignNotSync.ConfirmAndPayJson.CreatedBy,
				BookignNotSync.ConfirmAndPayJson.AccountType,
				BookignNotSync.EndDate,
				BookignNotSync.StartDestinationCountry,
				BookignNotSync.ServiceID
			);

			if (!ResponseConfirmAndPay.ReservationID) {
				throw new Error("ERROR API LEMAX CONFIRM AND PAY");
			}

			await this.ChangeReservationStatusBamba.changeReservationStatus({
				ReservationID: ResponseConfirmAndPay.ReservationID,
				StatusID: global.constants.RESERVATION_STATUS_ID_OPTION,
			});

			// cuando es usuario tipo super admin pasa de estatus 2 a 3 y no se valida availability ni se inserta transaction
			if (
				BookignNotSync.ConfirmAndPayJson.AccountType.toLowerCase() ==
				global.constants.CONFIRM_AND_PAY_ACCOUNT_TYPE_SUPER_ADMIN
			) {
				await this.ChangeReservationStatusBamba.changeReservationStatus({
					ReservationID: ResponseConfirmAndPay.ReservationID,
					StatusID: global.constants.RESERVATION_STATUS_ID_CONFIRMED,
				});

				await this.BookingUpdatePurchaseDateBamba.updateCustomPurchaseDate(
					ResponseConfirmAndPay.ReservationID
				);
			}

			if (
				BookignNotSync.ConfirmAndPayJson.AccountType.trim().toLowerCase() ==
				global.constants.CONFIRM_AND_PAY_ACCOUNT_TYPE_AGENT
			) {
				// si es usuario tipo agente y el status es available entonces pasamos a confirmed de lo contrario queda con status 2 Option
				if (
					BookignNotSync.ConfirmAndPayJson.Availability ==
					global.constants.AVAILABILITY_STATUS_AVAILABLE
				) {
					await this.ChangeReservationStatusBamba.changeReservationStatus({
						ReservationID: ResponseConfirmAndPay.ReservationID,
						StatusID: global.constants.RESERVATION_STATUS_ID_CONFIRMED,
					});

					await this.BookingUpdatePurchaseDateBamba.updateCustomPurchaseDate(
						ResponseConfirmAndPay.ReservationID
					);
				}
			}

			if (
				BookignNotSync.ConfirmAndPayJson.AccountType.toLowerCase() ==
				global.constants.CONFIRM_AND_PAY_ACCOUNT_TYPE_CLIENT
			) {
				if (
					BookignNotSync.ConfirmAndPayJson.Availability ==
					global.constants.AVAILABILITY_STATUS_AVAILABLE
				) {
					if (
						!BookignNotSync.ConfirmAndPayJson.PaymentMethod ||
						!BookignNotSync.ConfirmAndPayJson.PaymentID
					) {
						await this.ChangeReservationStatusBamba.changeReservationStatus({
							ReservationID: ResponseConfirmAndPay.ReservationID,
							StatusID: global.constants.RESERVATION_STATUS_ID_OPTION,
						});
					} else {
						await this.ChangeReservationStatusBamba.changeReservationStatus({
							ReservationID: ResponseConfirmAndPay.ReservationID,
							StatusID: global.constants.RESERVATION_STATUS_ID_CONFIRMED,
						});

						await this.BookingInsertTransactionForReservationBamba.insertTransactionForReservation(
							ResponseConfirmAndPay.ReservationID,
							BookignNotSync.ConfirmAndPayJson.AmountCalculatePrice,
							BookignNotSync.ConfirmAndPayJson.PaymentMethodID,
							BookignNotSync.ConfirmAndPayJson.PaymentID
						);
						await this.BookingUpdatePurchaseDateBamba.updateCustomPurchaseDate(
							ResponseConfirmAndPay.ReservationID
						);
					}
				}
			}

			Booking = await this.syncBookingByReservationID(
				ResponseConfirmAndPay.ReservationID
			);
		} catch (error) {
			let ReservationStatus = await ReservationStatusModel.findOne({
				lemaxId: global.constants.RESERVATION_STATUS_ID_SYNC_ERROR,
			});
			BookignNotSync.Status = ReservationStatus.lemaxId;
			BookignNotSync.StatusName = ReservationStatus.name;

			await BookignNotSync.save();

			throw new Error(error.message);
		}

		return Booking;
	}
}
