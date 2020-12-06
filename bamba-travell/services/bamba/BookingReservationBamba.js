import BookingInterface from "../../interface/bookingInterface";
import DateHelper from "../../helpers/DateHelper";

export default class BookingReservationBamba {
	constructor() {}

	/**
	 * Metodo que se encarga de recuperar el nombre del tour en los datos de la reservacion
	 *
	 * @param {*} ReservationItemList
	 */
	async getTourName(ReservationItemList) {
		let TourName = null;

		if (!Array.isArray(ReservationItemList)) {
			return TourName;
		}

		for (const i in ReservationItemList) {
			if (ReservationItemList[i].FITTourName) {
				TourName = ReservationItemList[i].FITTourName;
				break;
			}
		}

		if (!TourName) {
			for (const i in ReservationItemList) {
				if (typeof ReservationItemList[i].PackageTour != "undefined") {
					TourName = ReservationItemList[i].PackageTour.Name;
					break;
				}

				if (typeof ReservationItemList[i].AccommodationObject != "undefined") {
					TourName = ReservationItemList[i].AccommodationObject.Name;
					break;
				}
			}
		}

		return TourName;
	}

	/**
	 * Metodo que se encarga de recuperar el tipo del tour desde los datos de la reservacion
	 *
	 * @param {*} ReservationItemList
	 */
	async getTourType(ReservationItemList) {
		let TourType = null;

		if (!Array.isArray(ReservationItemList)) return TourType;

		for (const i in ReservationItemList) {
			if (typeof ReservationItemList[i].FITTourName != "undefined") {
				TourType = global.constants.TOUR_TYPE_FIT_TOUR;
				break;
			}
		}

		if (!TourType) {
			for (const i in ReservationItemList) {
				if (typeof ReservationItemList[i].PackageTour != "undefined") {
					let ObjectTypeID =
						ReservationItemList[i].PackageTour.ObjectType.ObjectTypeID;

					if (ObjectTypeID == global.constants.TOUR_TYPE_SIMPLE_TOUR) {
						TourType = ObjectTypeID;
						break;
					}
				}

				if (typeof ReservationItemList[i].AccommodationObject != "undefined") {
					let ObjectType =
						ReservationItemList[i].AccommodationObject.ObjectType.ObjectTypeID;

					if (ObjectType == global.constants.TOUR_TYPE_ACTIVITIES_TOUR) {
						TourType = ObjectType;
						break;
					}
				}
			}
		}

		return TourType;
	}

	/**
	 * Recupera los datos del estilo
	 *
	 * @param {*} Reservation
	 */
	async getStyle(CustomFieldList) {
		let style = "";

		if (!CustomFieldList || !Array.isArray(CustomFieldList.CustomField))
			return style;

		for (const i in CustomFieldList.CustomField) {
			let CustomFieldID = CustomFieldList.CustomField[i].CustomFieldID;
			let CustomFieldValue =
				CustomFieldList.CustomField[i].CustomFieldValue.Value;

			if (CustomFieldID == global.constants.CUSTOM_FIELD_PACKAGE_TYPE) {
				style = CustomFieldValue;
				break;
			}
		}

		return style;
	}

	/**
	 *
	 * @param {*} ReservationItemList
	 */
	async getAdventures(ReservationItemList) {
		let Adventures = [];
		let TempList = [];

		if (
			!Array.isArray(ReservationItemList) ||
			ReservationItemList.length == 0
		) {
			return Adventures;
		}

		for (const i in ReservationItemList) {
			if (typeof ReservationItemList[i].PackageTour != "undefined") {
				let ObjectID = ReservationItemList[i].PackageTour.ObjectID;
				let Name = ReservationItemList[i].PackageTour.Name;
				let StartDate = await DateHelper.getMomentDate(
					ReservationItemList[i].StartDate
				);
				let ObjectTypeID =
					ReservationItemList[i].PackageTour.ObjectType.ObjectTypeID;

				if (TempList.includes(ObjectID) == false) {
					if (ObjectID == global.constants.TOUR_TYPE_SIMPLE_TOUR) {
						TempList.push(ObjectID);

						let adventureItem = await BookingInterface.getAdventureInterface();
						adventureItem.TourName = Name;
						adventureItem.TourType = ObjectTypeID;
						adventureItem.TourDate = StartDate;

						Adventures.push(adventureItem);
					}
				}
			}

			if (typeof ReservationItemList[i].AccommodationObject != "undefined") {
				let ObjectID = ReservationItemList[i].AccommodationObject.ObjectID;
				let Name = ReservationItemList[i].AccommodationObject.Name;
				let ObjectTypeID =
					ReservationItemList[i].AccommodationObject.ObjectType.ObjectTypeID;
				let StartDate = await DateHelper.getMomentDate(
					ReservationItemList[i].StartDate
				);

				if (ObjectID == global.constants.TOUR_TYPE_ACTIVITIES_TOUR) {
					if (TempList.includes(ObjectID) == false) {
						TempList.push(ObjectID);

						let adventureItem = await BookingInterface.getAdventureInterface();
						adventureItem.TourName = Name;
						adventureItem.TourType = ObjectTypeID;
						adventureItem.TourDate = StartDate;
						Adventures.push(adventureItem);
					}
				}
			}
		}

		if (Adventures.length > 0) {
			Adventures.sort(function (a, b) {
				let c = new Date(a.TourDate);
				let d = new Date(b.TourDate);

				return c - d;
			});
		}

		return Adventures;
	}

	/**
	 * Metodo que se encarga de recuperar la ultima fecha para el booking
	 * @param {*} ReservationItemList
	 */
	async getEndDate(ReservationItemList) {
		let EndDate = null;
		let EndDateList = [];

		if (!Array.isArray(ReservationItemList)) return null;

		for (const i in ReservationItemList) {
			if (ReservationItemList[i].EndDate) {
				EndDateList.push(ReservationItemList[i].EndDate);
			}
		}

		if (EndDateList.length > 0) {
			EndDateList = await DateHelper.orderDates(EndDateList);
			EndDate = await DateHelper.getMomentDate(
				EndDateList[EndDateList.length - 1]
			);
		}

		return EndDate;
	}
}
