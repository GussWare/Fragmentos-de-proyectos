"use strict";

exports.getBookingInterface = async () => {
	var booking = {
		_id: null,
		AgentReferenceNumber: null,
		BambaReservationID: null,
		BambaReferenceNumber: null,
		ReservationLemaxID: null,
		ReservationUniqueID: null,
		TourID: null,
		TourName: null,
		TourType: null,
		TourTypeName: null,
		GrossPrice: null,
		GrossPriceFormatted: null,
		LeadTraveller: null,
		Customer: null,
		CreatedBy: null,
		DepartureDate: null,
		DateCreated: null,
		PurchaseDate: null,
		Status: null,
		StatusName: null,
		Documents: null,
		Adventures: null,

		ReservationItemList: null,
		AdditionalServices: [],
		PassengerForRooms: null,
		BranchOffice: null,
		BranchOfficeSlug: null,
		BranchOfficeName: null,
		ConfirmAndPayJson: null,
		CalculatePriceJson: null,
		SellingPrice: null,
		SellingPriceDefault: null,
		NetPrice: null,
		NetPriceDefault: null,
		Margin: null,
		PartnerCommission: null,
		Commission: null,
		RemainingAmmount: null,
		PaidAmmount: null,
		StartDestinationCountry: null,
		EndDate: null,
		ServiceID: null,
	};

	return booking;
};

exports.getAdventureInterface = async () => {
	var adventure = {
		TourName: null,
		TourType: null,
		TourDate: null,
	};

	return adventure;
};

exports.getServiceInterface = async () => {
	var adventure = {
		Type: null,
		StartDate: null,
		Service: null,
		Name: null,
		Pax: null,
		StartDestination: null,
		Duration: null,
		AccomodationID: null,
		AccomodationDescription: null,
		SellingPrice: null,
		SellingPriceDefault: null,
		NetPrice: null,
		NetPriceDefault: null,
		RealNetPrice: null,
		RealNetPriceWithoutTax: null,
		Margin: null,
	};

	return adventure;
};

exports.getPassengerRoomItemInterface = async () => {
	var passengerRoom = {
		Title: null,
		Passengers: [],
	};

	return passengerRoom;
};

exports.getPassengerRoom = async () => {
	return {
		PassengerID: null,
		Name: null,
		Surname: null,
		Email: null,
		DateOfBirth: null,
		Gender: null,
		Nationality: null,
		NationalityMongo: null,
		PassengerIDReference: null,
		PassportNumber: null,
	};
};

exports.getLeadTravellerInterface = async () => {
	return {
		PassengerID: null,
		FullName: null,
		Name: null,
		Surname: null,
		DateOfBirth: null,
		Age: null,
		Gender: null,
		MobilePhone: null,
		PassportNumber: null,
		Email: null,
		Nationality: null,
		NationalityMongo: null,
	};
};

exports.getCustomerInterface = async () => {
	return {
		CustomerID: null,
		IsCustomer: null,
		IsSupplier: null,
		IsPartner: null,
		IsLoyaltyMember: null,
		LanguageID: null,
		CustomerType: null,
		TelephoneNumber2: null,
		MobilePhoneNumber: null,
		Email: null,
		PersonName: null,
		PersonSurname: null,
		CompanyName: null,
		PassportNumber: null,
		TaxPayerType: null,
		BirthDate: null,
		CountryID: null,
		CitizenshipID: null,
		Sex: null,
		ContractType: null,
		LogEntries: null,
		PointPerCurrency: null,
		CreatedDate: null,
		ModifiedDate: null,
		OtherSystemID: null,
		listCustomField: null,
	};
};
