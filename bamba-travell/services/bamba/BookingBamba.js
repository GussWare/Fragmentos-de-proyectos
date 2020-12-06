import ReservationBamba from "./ReservationBamba";
import BookingModel from "../../models/BookingModel";
import DateHelper from "../../helpers/DateHelper";
import BookingStatusBamba from "./BookingStatusBamba";

export default class BookingBamba {
	constructor() {
		this.BookingStatusBamba = new BookingStatusBamba();
	}

	/**
	 * Retorna el total de paginas de reservaciones en lemax, es utilizado en el sync de bookings
	 *
	 * @param {*} ReservationModifiedDateFrom
	 * @param {*} ReservationModifiedDateTo
	 * @param {*} PageSize
	 */
	async getTotalPages(
		ReservationModifiedDateFrom,
		ReservationModifiedDateTo,
		PageSize = 1
	) {
		let FilterReservation = {};
		FilterReservation.CurrentPage = 0;
		FilterReservation.PageSize = PageSize;

		if (ReservationModifiedDateFrom) {
			FilterReservation.ReservationModifiedDateFrom = await DateHelper.getMomentDate(
				ReservationModifiedDateFrom
			);
		}

		if (ReservationModifiedDateTo) {
			FilterReservation.ReservationModifiedDateTo = await DateHelper.getMomentDate(
				ReservationModifiedDateTo
			);
		}

		const reservationBamba = new ReservationBamba();
		const reservationInfo = await reservationBamba.getAllReservations(
			FilterReservation
		);

		if (reservationInfo.Status.Code != "OK") {
			return {
				TotalReservation: 0,
				TotalPaginas: 0,
			};
		}

		const TotalReservation = reservationInfo.TotalNumberOfRecords;
		const TotalPaginas =
			Math.ceil(parseInt(TotalReservation) / parseInt(PageSize)) > 0
				? Math.ceil(parseInt(TotalReservation) / parseInt(PageSize))
				: 1;

		if (TotalPaginas == 0) {
			return {
				TotalReservation: 0,
				TotalPaginas: 0,
			};
		}

		return {
			TotalReservation: TotalReservation,
			TotalPaginas: TotalPaginas,
		};
	}

	async insert(Booking) {
		let bookingInsert = null;

		if (Booking.ReservationLemaxID || Booking.BambaReservationID) {
			let BookingDB = null;
			let ContaBooking = 0;

			if (Booking.BambaReservationID) {
				ContaBooking = await BookingModel.countDocuments({
					BambaReservationID: Booking.BambaReservationID,
				});
				if (ContaBooking > 0) {
					BookingDB = await BookingModel.findOne({
						BambaReservationID: Booking.BambaReservationID,
					});
				}
			}

			if (ContaBooking == 0) {
				if (Booking.ReservationLemaxID) {
					ContaBooking = await BookingModel.countDocuments({
						ReservationLemaxID: Booking.ReservationLemaxID,
					});
					if (ContaBooking > 0) {
						BookingDB = await BookingModel.findOne({
							ReservationLemaxID: Booking.ReservationLemaxID,
						});
					}
				}
			}

			if (ContaBooking == 0) {
				BookingDB = new BookingModel();
			}

			BookingDB.BambaReservationID = Booking.BambaReservationID;
			BookingDB.BambaReferenceNumber = Booking.BambaReferenceNumber;
			BookingDB.ReservationLemaxID = Booking.ReservationLemaxID;
			BookingDB.ReservationUniqueID = Booking.ReservationUniqueID;
			BookingDB.TourID = Booking.TourID;
			BookingDB.TourName = Booking.TourName;
			BookingDB.TourType = Booking.TourType;
			BookingDB.TourTypeName = Booking.TourTypeName;
			BookingDB.GrossPrice = Booking.GrossPrice;
			BookingDB.GrossPriceFormatted = Booking.GrossPriceFormatted;
			BookingDB.Customer = Booking.Customer;
			BookingDB.DateCreated = Booking.DateCreated;
			BookingDB.PurchaseDate = Booking.PurchaseDate;
			BookingDB.Status = Booking.Status;
			BookingDB.StatusName = await this.BookingStatusBamba.getStatusName(
				Booking.Status
			);
			BookingDB.DepartureDate = Booking.DepartureDate;
			BookingDB.LeadTraveller = Booking.LeadTraveller;
			BookingDB.AgentReferenceNumber = Booking.AgentReferenceNumber;
			BookingDB.CreatedBy = Booking.CreatedBy;
			BookingDB.Documents = Booking.Documents;
			BookingDB.Adventures = Booking.Adventures;
			BookingDB.PassengerForRooms = Booking.PassengerForRooms;
			BookingDB.BranchOffice = Booking.BranchOffice;
			BookingDB.BranchOfficeSlug = Booking.BranchOfficeSlug;
			BookingDB.BranchOfficeName = Booking.BranchOfficeName;
			BookingDB.ConfirmAndPayJson = Booking.ConfirmAndPayJson;
			BookingDB.CalculatePriceJson = Booking.CalculatePriceJson;
			BookingDB.ReservationItemList = Booking.ReservationItemList;
			BookingDB.AdditionalServices = Booking.AdditionalServices;

			BookingDB.SellingPrice = Booking.SellingPrice;
			BookingDB.SellingPriceDefault = Booking.SellingPriceDefault;
			BookingDB.NetPrice = Booking.NetPrice;
			BookingDB.NetPriceDefault = Booking.NetPriceDefault;
			BookingDB.Margin = Booking.Margin;
			BookingDB.PartnerCommission = Booking.PartnerCommission;
			BookingDB.Commission = Booking.Commission;
			BookingDB.RemainingAmmount = Booking.RemainingAmmount;
			BookingDB.PaidAmmount = Booking.PaidAmmount;
			BookingDB.PaidAmmount = Booking.PaidAmmount;
			BookingDB.StartDestinationCountry = Booking.StartDestinationCountry;
			BookingDB.EndDate = Booking.EndDate;
			BookingDB.ServiceID = Booking.ServiceID;

			bookingInsert = await BookingDB.save();
		}

		return bookingInsert;
	}
}
