import BookingInterface from "../../interface/bookingInterface";
import DateHelper from "../../helpers/DateHelper";
import NumberHelper from "../../helpers/NumberHelper";
import BookingStatusBamba from "./BookingStatusBamba";
import BookingReservationBamba from "./BookingReservationBamba";
import BookingPassengersBamba from "./BookingPassengersBamba";
import BookingServicesBamba from "./BookingServicesBamba";
import TourBamba from "./TourBamba";
import BranchOfficeMoel from "../../models/BranchOfficeModel";
import BookingModel from "../../models/BookingModel";

export default class BookingPrepareDataBamba {
	constructor() {
		this.BookingStatusBamba = new BookingStatusBamba();
		this.BookingReservationBamba = new BookingReservationBamba();
		this.BookingPassengersBamba = new BookingPassengersBamba();
		this.BookingServicesBamba = new BookingServicesBamba();
		this.TourBamba = new TourBamba();
	}

	/**
	 * Se encarga de recuperar los datos  de la reservacion y guardar el booking
	 *
	 * @param {ReservationResponse} Reservation
	 */
	async prepareDataForBookingCollection(Reservation) {
		let Booking = await BookingInterface.getBookingInterface();
		let Style = null;

		Booking.ReservationLemaxID = Reservation.ReservationID;
		Booking.ReservationUniqueID = Reservation.ReservationUniqueID;
		Booking.Customer = Reservation.Customer;
		Booking.DateCreated = await DateHelper.getMomentDate(
			Reservation.CreationDate
		);
		Booking.Status = Reservation.Status;
		Booking.StatusName = await this.BookingStatusBamba.getStatusName(
			Reservation.Status
		);
		Booking.GrossPrice = Reservation.SellingPriceDefault;
		Booking.GrossPriceFormatted = await NumberHelper.formatNumber(
			Reservation.SellingPriceDefault
		);

		Booking.SellingPrice = Reservation.SellingPrice;
		Booking.SellingPriceDefault = Reservation.SellingPriceDefault;
		Booking.NetPrice = Reservation.NetPrice;
		Booking.NetPriceDefault = Reservation.NetPriceDefault;
		Booking.Margin = Reservation.Margin;
		Booking.PartnerCommission = Reservation.PartnerCommission;
		Booking.Commission = Reservation.Commission;
		Booking.RemainingAmmount = Reservation.RemainingAmmount;
		Booking.PaidAmmount = Reservation.PaidAmmount;

		/* 
            DESCOMENTAR CUANDO LEMAX CORRIGA SU BUG CON EL BRANCHOFFICE
            Booking.BranchOffice = Reservation.OfficeID;
            Booking.BranchOfficeSlug = await this.getBranchOfficeSlug(Reservation.OfficeID);
            Booking.BranchOfficeName = await this.getBranchOfficeName(Reservation.OfficeID);
            */

		if (Reservation.CustomFieldList) {
			for (const i in Reservation.CustomFieldList.CustomField) {
				let CustomField = Reservation.CustomFieldList.CustomField[i];

				if (
					CustomField.CustomFieldID ==
					global.constants.CUSTOM_FIELD_AGENT_REFERENCE_NUMBER
				) {
					Booking.AgentReferenceNumber = CustomField.CustomFieldValue.Value;
				}

				if (
					CustomField.CustomFieldID == global.constants.CUSTOM_FIELD_CREATED_BY
				) {
					Booking.CreatedBy = CustomField.CustomFieldValue.Value;
				}

				if (
					CustomField.CustomFieldID ==
					global.constants.CUSTOM_FIELD_PURCHASE_DATE
				) {
					Booking.PurchaseDate = CustomField.CustomFieldValue.Value;
				}

				if (
					CustomField.CustomFieldID ==
					global.constants.CUSTOM_FIELD_BAMBA_RESERVATION_ID
				) {
					Booking.BambaReservationID = CustomField.CustomFieldValue.Value;
				}

				if (
					CustomField.CustomFieldID ==
					global.constants.CUSTOM_FIELD_BAMBA_REFERENCE_NUMBER
				) {
					Booking.BambaReferenceNumber = CustomField.CustomFieldValue.Value;
				}

				if (
					CustomField.CustomFieldID ==
					global.constants.CUSTOM_FIELD_BAMBA_TOUR_ID
				) {
					Booking.TourID = CustomField.CustomFieldValue.Value;
				}

				if (
					CustomField.CustomFieldID == global.constants.CUSTOM_FIELD_TOUR_TYPE
				) {
					Booking.TourType = CustomField.CustomFieldValue.Value;
					Booking.TourTypeName = await this.TourBamba.getTourTypeName(
						Booking.TourType
					);
				}

				if (
					CustomField.CustomFieldID ==
					global.constants.CUSTOM_FIELD_PACKAGE_TYPE
				) {
					Style = CustomField.CustomFieldValue.Value;
				}

				if (
					CustomField.CustomFieldID ==
					global.constants.CUSTOM_FIELD_BOOKING_END_DATE
				) {
					Booking.EndDate = await DateHelper.getMomentDate(
						CustomField.CustomFieldValue.Value
					);
				}

				if (
					CustomField.CustomFieldID ==
					global.constants.CUSTOM_FIELD_BOOKING_START_DESTINATION_COUNTRY
				) {
					Booking.StartDestinationCountry = CustomField.CustomFieldValue.Value;
				}

				if (
					CustomField.CustomFieldID ==
					global.constants.CUSTOM_FIELD_BOOKING_SERVICE_ID_MAIN_TOUR
				) {
					Booking.ServiceID = CustomField.CustomFieldValue.Value;
				}

				// BORRAR CUANDO LEMAX ARREGLE EL BUG DE BRANCHOFFICE
				if (
					CustomField.CustomFieldID ==
					global.constants.CUSTOM_FIELD_BRANCHOFFICE
				) {
					let BranchOfficeDB = await BranchOfficeMoel.findOne({
						lemaxId: CustomField.CustomFieldValue.Value.trim(),
					});

					Booking.BranchOffice = BranchOfficeDB.lemaxId;
					Booking.BranchOfficeSlug = BranchOfficeDB.slug;
					Booking.BranchOfficeName = BranchOfficeDB.name;
				}
			}
		}

		if (Reservation.ReservationItemList) {
			if (Array.isArray(Reservation.ReservationItemList.ReservationItem)) {
				if (Reservation.ReservationItemList.ReservationItem.length > 0) {
					let ReservationItemList =
						Reservation.ReservationItemList.ReservationItem;
					let ReservationItem =
						Reservation.ReservationItemList.ReservationItem[0];

					if (!Booking.TourType) {
						Booking.TourType = await this.BookingReservationBamba.getTourType(
							ReservationItemList
						);
						Booking.TourTypeName = await this.TourBamba.getTourTypeName(
							Booking.TourType
						);
					}

					Booking.DepartureDate = await DateHelper.getMomentDate(
						ReservationItem.StartDate
					);

					if (ReservationItem.PassengerList) {
						Booking.LeadTraveller = ReservationItem.PassengerList.Passenger[0];
					}

					Booking.TourName = await this.BookingReservationBamba.getTourName(
						ReservationItemList
					);
					Booking.Adventures = await this.BookingReservationBamba.getAdventures(
						ReservationItemList
					);
					Booking.PassengerForRooms = await this.BookingPassengersBamba.getPassengers(
						Booking.TourType,
						Booking.ReservationUniqueID,
						ReservationItemList,
						Style
					);

					Booking.ReservationItemList = await this.BookingServicesBamba.getServices(
						ReservationItemList
					);

					Booking.AdditionalServices = await this.BookingServicesBamba.getAdditionalServices(
						ReservationItemList
					);
				}
			}
		}

		if (Reservation.DocumentList) {
			if (Array.isArray(Reservation.DocumentList.Document)) {
				Booking.Documents = Reservation.DocumentList.Document;
			}
		}

		if (Booking.BambaReservationID) {
			let BookignDB = await BookingModel.findOne({
				BambaReservationID: Booking.BambaReservationID,
			});

			if (BookignDB) {
				Booking.ConfirmAndPayJson = BookignDB.ConfirmAndPayJson;
				Booking.CalculatePriceJson = BookignDB.CalculatePriceJson;
			}
		}

		if (!Booking.StartDestinationCountry) {
			Booking.StartDestinationCountry = await this.TourBamba.getStartDestination(
				Booking.TourID
			);
		}

		if (!Booking.EndDate) {
			Booking.EndDate = await this.BookingReservationBamba.getEndDate(
				Booking.ReservationItemList
			);
		}

		if (!Booking.ServiceID) {
			//Booking.ServiceID = await this.getServiceIDBooking(ReservationItemList);
		}

		return Booking;
	}

	/**
	 * Metodo que se encarga de prerparar un objecto booking con la informacion necesaria
	 * para ser mostrado en la vista correctamente.
	 *
	 * @param {Object} Booking
	 */
	async PrepareToViewBooking(Booking) {
		let BookignInterface = await BookingInterface.getBookingInterface();

		for (const i in BookignInterface) {
			if (typeof Booking[i] != "undefined") {
				BookignInterface[i] = Booking[i];
			}
		}

		if (Booking.DepartureDate) {
			BookignInterface.DepartureDate = await DateHelper.formatHuman(
				Booking.DepartureDate
			);
		}

		if (Booking.DateCreated) {
			BookignInterface.DateCreated = await DateHelper.formatHuman(
				Booking.DateCreated
			);
		}

		if (Booking.PurchaseDate) {
			BookignInterface.PurchaseDate = await DateHelper.formatHuman(
				Booking.PurchaseDate
			);
		}

		return BookignInterface;
	}
}
