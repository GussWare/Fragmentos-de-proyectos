import BookingInterface from "../../interface/bookingInterface";
import DateHelper from "../../helpers/DateHelper";
import TourDetailModel from "../../models/TourDetailModel";
import AttributeGroupLibrary from "../../libraries/AttributeGroupLibrary";

export default class BookingServicesBamba {
	constructor() {
		this.AttributeGroupLibrary = new AttributeGroupLibrary();
	}

	/**
	 * Se encarga de recuperar todos los servicios
	 *
	 * @param {*} ReservationItemList
	 */
	async getServices(ReservationItemList) {
		let ServicesList = [];
		let TempList = [];

		if (!Array.isArray(ReservationItemList)) {
			return ServicesList;
		}

		for (const i in ReservationItemList) {
			let ReservationItem = ReservationItemList[i];
			let Service = await BookingInterface.getServiceInterface();

			Service.StartDestination = ReservationItem.DestinationName;
			Service.StartDate = await DateHelper.getMomentDate(
				ReservationItem.StartDate
			);
			Service.EndDate = await DateHelper.getMomentDate(ReservationItem.EndDate);
			Service.SellingPrice = ReservationItem.SellingPrice;
			Service.SellingPriceDefault = ReservationItem.SellingPriceDefault;
			Service.NetPrice = ReservationItem.NetPrice;
			Service.NetPriceDefault = ReservationItem.NetPriceDefault;
			Service.RealNetPrice = ReservationItem.RealNetPrice;
			Service.RealNetPriceWithoutTax = ReservationItem.RealNetPriceWithoutTax;
			Service.Margin = ReservationItem.Margin;

			if (ReservationItem.PassengerList) {
				if (Array.isArray(ReservationItem.PassengerList.Passenger)) {
					Service.Pax = ReservationItem.PassengerList.Passenger.length;
				}
			}

			// Simple Tour
			if (typeof ReservationItem.PackageTour != "undefined") {
				let PackageTour = ReservationItem.PackageTour;
				let PackageUnit = ReservationItem.PackageUnit;

				if (TempList.includes(PackageTour.ObjectID) == false) {
					if (
						PackageTour.ObjectType.ObjectTypeID ==
						global.constants.TOUR_TYPE_SIMPLE_TOUR
					) {
						Service.Name = PackageTour.Name;
						Service.Service = "Experience";
						Service.Type = "Simple Tour";

						let TourDuration = await TourDetailModel.findOne(
							{ TourID: ReservationItem.PackageTour.ObjectID },
							"TourTitle DurationDD AccommodationObjectList"
						);

						if (TourDuration) {
							Service.Duration = TourDuration.DurationDD;

							if (Service.Duration) {
								Service.Duration = `${Service.Duration} days(s)`;
							}
						}

						// aqui agregar los datos del AccomodationUnitID necesario para xero

						Service.AccomodationID = PackageUnit.UnitID;
						Service.AccomodationDescription = await this.getAccomodationDescription(
							TourDuration.TourTitle,
							PackageUnit.UnitID,
							TourDuration.AccommodationObjectList
						);

						TempList.push(ReservationItem.PackageTour.ObjectType.ObjectTypeID);
					}
				}
			}

			// Activity
			if (typeof ReservationItem.AccommodationObject != "undefined") {
				let AccommodationObject = ReservationItem.AccommodationObject;
				let AccommodationUnit = ReservationItem.AccommodationUnit;

				if (
					AccommodationObject.ObjectType.ObjectTypeID ==
					global.constants.TOUR_TYPE_ACTIVITIES_TOUR
				) {
					if (TempList.includes(AccommodationObject.ObjectID) == false) {
						Service.Service = "Experience";
						Service.Type = "Activity";
						Service.Name = ReservationItem.AccommodationObject.Name;

						let TourDuration = await TourDetailModel.findOne(
							{
								TourID: ReservationItem.AccommodationObject.ObjectID,
							},
							"TourTitle DurationHR AccommodationObjectList"
						);

						if (TourDuration) {
							Service.Duration = TourDuration.DurationHR;
							if (Service.Duration) {
								Service.Duration = `${Service.Duration} hour(s)`;
							}
						}

						Service.AccomodationID = AccommodationUnit.UnitID;
						Service.AccomodationDescription = await this.getAccomodationDescription(
							TourDuration.TourTitle,
							AccommodationUnit.UnitID,
							TourDuration.AccommodationObjectList
						);

						TempList.push(ReservationItem.AccommodationObject.ObjectID);
					}
				}
			}

			// Accomodation
			if (typeof ReservationItem.AccommodationObject != "undefined") {
				let AccommodationObject = ReservationItem.AccommodationObject;
				let AccommodationUnit = ReservationItem.AccommodationUnit;

				if (
					AccommodationObject.ObjectType.ObjectTypeID !=
					global.constants.TOUR_TYPE_ACTIVITIES_TOUR
				) {
					if (TempList.includes(AccommodationObject.ObjectID) == false) {
						Service.Service = "Accommodation";
						Service.Type = "Accommodation";
						Service.Name = AccommodationObject.Name;

						Service.Duration = `${await DateHelper.getDurationMasUno(
							ReservationItem.StartDate,
							ReservationItem.EndDate
						)} day(s)`;

						Service.AccomodationID = AccommodationUnit.UnitID;
						Service.AccomodationDescription = AccommodationObject.Name;

						TempList.push(ReservationItem.AccommodationObject.ObjectID);
					}
				}
			}

			// Transportation
			if (typeof ReservationItem.Transportation != "undefined") {
				let Transportation = ReservationItem.Transportation;
				let TransportationUnit = ReservationItem.TransportationUnit;

				if (TempList.includes(Transportation.ObjectID) == false) {
					Service.Service = "Transportation";
					Service.Type = "Transportation";
					Service.Name = Transportation.Name;

					let Duration = null;
					if (Transportation.TransportationUnitList) {
						Duration = await this.AttributeGroupLibrary.getAttribute(
							global.constants.GROUP_NAME_TRANSFER_TRANSPORTATION_UNIT,
							global.constants.ATTRIBUTE_DURATION_HR,
							Transportation.TransportationUnitList.TransportationUnit[0]
								.AttributeGroupList
						);
					}

					if (Duration) {
						Service.Duration = `${Duration} hour(s)`;
					}

					Service.AccomodationID = TransportationUnit.UnitID;
					Service.AccomodationDescription = Transportation.Name;

					TempList.push(Transportation.ObjectID);
				}
			}

			if (Service.Name) {
				ServicesList.push(Service);
			}
		}

		return ServicesList;
	}

	/**
	 * Recupera nada mas los servicios adicionales
	 *
	 * @param {*} ReservationItemList
	 */
	async getAdditionalServices(ReservationItemList) {
		if (!Array.isArray(ReservationItemList)) {
			return AdditionalServices;
		}

		let AdditionalServices = [];
		let ServiceTypeAdditionalService =
			global.constants.SERVICE_TYPE_ADDITIONAL_SERVICE;

		ServiceTypeAdditionalService = ServiceTypeAdditionalService.toLowerCase().trim();

		for (const i in ReservationItemList) {
			let ReservationItem = ReservationItemList[i];

			if (typeof ReservationItem.ReservationItemDetailsList != "undefined") {
				let ReservationItemDetails =
					ReservationItem.ReservationItemDetailsList.ReservationItemDetails;

				for (const j in ReservationItemDetails) {
					if (ReservationItemDetails[j].Service) {
						let Service = ReservationItemDetails[j].Service;
						let ServiceType = Service.ServiceType.toLowerCase().trim();

						if (ServiceType == ServiceTypeAdditionalService) {
							AdditionalServices.push(
								ReservationItem.ReservationItemDetailsList
									.ReservationItemDetails[j]
							);
						}
					}
				}
			}
		}

		return AdditionalServices;
	}

	/**
	 * Recupera la descripcion del accomodation
	 *
	 * @param {*} TourName
	 * @param {*} AccomodationID
	 * @param {*} AccomodationObjectList
	 */
	async getAccomodationDescription(
		TourTitle,
		AccomodationID,
		AccomodationObjectList
	) {
		let UnitName = "";

		for (const i in AccomodationObjectList) {
			if (AccomodationObjectList[i].UnitID == AccomodationID) {
				UnitName = AccomodationObjectList[i].UnitName;
				break;
			}
		}

		let AccomodationDescription = `${TourTitle} ${UnitName}`;

		return AccomodationDescription;
	}
}
