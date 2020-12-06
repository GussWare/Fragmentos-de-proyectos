import ReservationStatusModel from "../../models/ReservationStatusModel";

export default class BookingStatusBamba {
	constructor() {}

	/**
	 * Recupera el nombre del status desde la base de datos
	 *
	 * @param {string} Status
	 */
	async getStatusName(Status) {
		let StatusName = "";

		let StatusDB = await ReservationStatusModel.findOne({ lemaxId: Status });
		if (StatusDB) {
			StatusName = StatusDB.name;
		}

		return StatusName;
	}
}
