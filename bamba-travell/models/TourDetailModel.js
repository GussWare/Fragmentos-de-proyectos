'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaPrice = Schema({
    Discount: { type: Object, required: false },
    SpecialOffer: { type: Object, required: false },
    PriceOriginal: { type: Number, required: false },
    PriceOriginalFormatted: { type: String, required: false },
    Price: { type: Number, required: false },
    PriceFormatted: { type: String, required: false },
    BillingTypeName: { type: String, required: false }
});

const TourDetailShema = Schema({
    TourID: { type: Number, required: true },
    TourTitle: { type: String, required: true },
    Type: { type: Number, required: true },
    TypeName: { type: String, required: true },
    PriceInfo: { type: SchemaPrice, required: true },
    UnitMinimumPrice: { type: Number, required: true },
    Style: { type: Object, required: true },
    Mapa: { type: Object, required: false },
    Galery: { type: Array, required: false },
    MainTheme: { type: Array, required: false },
    DurationDD: { type: Number, required: false },
    DurationHR: { type: String, required: false },
    DeparturePoint: { type: String, required: false },
    DepartureTimes: { type: String, required: false },
    ArrivalPoint: { type: String, required: false },
    Regions: { type: Array, required: false },
    Countries: { type: Array, required: false },
    NumberOfCountries: { type: Number, required: false },
    StartDestination: { type: String, required: false },
    EndDestination: { type: String, required: false },
    StartDestinationID: { type: Number, required: false },
    EndDestinationID: { type: Number, required: false },
    ArrivalCityHotel: { type: Boolean, required: false },
    DepartureCityHotel: { type: Boolean, required: false },
    Themes: { type: Array, required: false },
    Overview: { type: Array, required: false },
    Highlights: { type: Array, required: false },
    WhatYouGet: { type: Array, required: false },
    WhatIsNotIncluded: { type: Array, required: false },
    Itinerary: { type: Object, required: false },
    ExperiencesIncluded: { type: Array, required: false },
    AccommodationPickupIncluded: { type: String, required: false },
    AccomodationDropOffIncluded: { type: String, required: false },
    LocalPayment: { type: String, required: false },
    UnitID: { type: Number, required: true },
    ServiceID: { type: Number, required: true },
    AccommodationObjectList: { type: Array, required: true },
    ListNotStartDays: { type: Array, required: false },
    UnavailableDates: { type: Array, required: false },
    Easy: { type: String, required: false },
    Moderate: { type: String, required: false },
    MildlyChallenging: { type: String, required: false },
    Challenging: { type: String, required: false },
    VeryChallenging: { type: String, required: false },
    NoteAdditionalInformation: { type: Object, required: false },
    NoteImportantInformation: { type: Object, required: false },
    NoteCoupon: { type: Object, required: false },
    NoteDiscount: { type: Object, required: false },
    NoteSpecialOffer: { type: Object, required: false },
    LanguageID: { type: String, required: true },
    BambaRecommendedTrip: { type: Number, required: false },
    ParentIDFilter: { type: Number, required: false },
    ShowProductB2C: { type: Number, required: false },
    ShowProductB2B: { type: Number, required: false },
    SearchPriority: { type: Number, required: false },
    AirportPickup: { type: Number, required: false },
    DontShowRooms: { type: Number, required: false },
    PeriodList: { type: Array, required: false },
    MajorRegion: { type: Object, required: false },
    PackageType: { type: Object, required: false },
    IsInca: { type: Boolean, required: true },
    IncaDays: { type: Number, required: false },
    SEOKeyWords:{ type: String, required: false }
});

TourDetailShema.index({
    TourID: 1,
    Type:1,
    LanguageID: -1
});

module.exports = mongoose.model('TourDetail', TourDetailShema);