"use strict";

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const BookingSchema = Schema({
	AgentReferenceNumber: { type: String, required: false },
	BambaReservationID: { type: String, required: false },
	BambaReferenceNumber: { type: String, required: false },
	ReservationLemaxID: { type: Number, required: false },
	ReservationUniqueID: { type: String, required: false },
	TourID: { type: Number, required: false },
	TourName: { type: String, required: false },
	TourType: { type: Number, required: false },
	TourTypeName: { type: String, required: false },
	GrossPrice: { type: Number, required: false },
	GrossPriceFormatted: { type: String, required: false },
	LeadTraveller: { type: Object, required: false },
	Customer: { type: Object, required: false },
	CreatedBy: { type: Object, required: false },
	DepartureDate: { type: Date, required: false },
	DateCreated: { type: Date, required: false },
	PurchaseDate: { type: Date, required: false },
	Status: { type: Number, required: false },
	StatusName: { type: String, required: false },
	Documents: { type: Array, required: false },
	Adventures: { type: Array, required: false },
	PassengerForRooms: { type: Array, required: false },
	BranchOffice: { type: Number, required: false },
	BranchOfficeSlug: { type: String, required: false },
	BranchOfficeName: { type: String, required: false },
	ConfirmAndPayJson: { type: Object, required: false },
	CalculatePriceJson: { type: Object, required: false },
	ReservationItemList: { type: Array, required: false },
	AdditionalServices: { type: Array, required: false },
	SellingPrice: { type: Number, required: false },
	SellingPriceDefault: { type: Number, required: false },
	NetPrice: { type: Number, required: false },
	NetPriceDefault: { type: Number, required: false },
	Margin: { type: Number, required: false },
	PartnerCommission: { type: Number, required: false },
	Commission: { type: Number, required: false },
	RemainingAmmount: { type: Number, required: false },
	PaidAmmount: { type: Number, required: false },
	StartDestinationCountry: { type: String, required: false },
	EndDate: { type: Date, required: false },
	ServiceID: { type: Number, required: false },
});

BookingSchema.index(
	{
		BambaReservationID: 1,
		BambaReservationUniqueReference: 1,
		ReservationLemaxID: 1,
		ReservationUniqueID: 1,
	},
	{ unique: true }
);

BookingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Booking", BookingSchema, "bookings");
