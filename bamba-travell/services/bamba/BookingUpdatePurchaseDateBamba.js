import UpdateCustomFieldsBamba from "./UpdateCustomFieldsBamba";

export default class BookingUpdatePurchaseDateBamba {
	constructor() {
		this.UpdateCustomFieldsBamba = new UpdateCustomFieldsBamba();
	}

	/**
	 * Metodo que se encarga de actualizar el custom field de purchase date en lemax
	 *
	 * @param {*} ReservationID
	 * @param {*} CompareStatus
	 * @param {*} StatusBooking
	 * @param {*} StatusReservation
	 */
	async updateCustomPurchaseDate(
		ReservationID,
		CompareStatus = false,
		StatusBooking = null,
		StatusReservation = null
	) {
		let DatePurchaseDate = null;

		if (CompareStatus) {
			if (
				StatusBooking != global.constants.RESERVATION_STATUS_ID_CONFIRMED &&
				StatusReservation == global.constants.RESERVATION_STATUS_ID_CONFIRMED
			) {
				try {
					DatePurchaseDate = await this.UpdateCustomFieldsBamba.updateCustomPurchaseDate(
						ReservationID
					);
				} catch (error) {}
			}
		} else {
			try {
				DatePurchaseDate = await this.UpdateCustomFieldsBamba.updateCustomPurchaseDate(
					ReservationID
				);
			} catch (error) {}
		}

		return DatePurchaseDate;
	}
}
