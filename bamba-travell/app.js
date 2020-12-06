import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import express from "express";
import bodyParser from "body-parser";
import TestController from "./controllers/v1/TestController";
import ThemeController from "./controllers/v1/ThemeController";
import ThemeCategoriesController from "./controllers/v1/ThemeCategoriesController";
import TravelStylesController from "./controllers/v1/TravelStylesController";
import CountriesController from "./controllers/v1/CountriesController";
import HomeController from "./controllers/v1/HomeController";
import InstagramController from "./controllers/v1/InstagramController";
import RegionAttractionsController from "./controllers/v1/RegionAttractionsController";
import RegionsController from "./controllers/v1/RegionsController";
import SearchController from "./controllers/v1/SearchController";
import TopToursController from "./controllers/v1/TopToursController";
import PackageController from "./controllers/v1/PackageController";
import PaymentMethodsController from "./controllers/v1/PaymentMethodsController";
import CheckoutController from "./controllers/v1/CheckoutController";
import TravelAndExtrasController from "./controllers/v1/TravelAndExtrasController";
import HotelesController from "./controllers/v1/HotelesController";
import LoginController from "./controllers/v1/LoginController";
import CalculatePriceController from "./controllers/v1/CalculatePriceController";
import TransportationController from "./controllers/v1/TransportationController";
import ConfirmAndPayController from "./controllers/v1/ConfirmAndPayController";
import SeoController from "./controllers/v1/SeoController";
import ReservationController from "./controllers/v1/ReservationController";
import StripeController from "./controllers/v1/StripeController";
import ContentPagesController from "./controllers/v1/ContentPagesController";
import TailorMadeController from "./controllers/v1/TailorMadeController";
import StaticDataController from "./controllers/v1/StaticDataController";
import ProdBambaSyncController from "./controllers/v1/ProdBambaSyncController";
import TourProductDetailsController from "./controllers/v1/TourProductDetailsController";
import FullListController from "./controllers/v1/FullListController";
import PriceTourController from "./controllers/v1/PriceTourController";
import TransactionController from "./controllers/v1/TransactionController";
import UpdateCustomFiledController from "./controllers/v1/UpdateCustomFiledController";
import BambaSyncController from "./controllers/v1/BambaSyncController";
import InsertTransactionForReservationController from "./controllers/v1/InsertTransactionForReservationController";
import SendingBlueController from "./controllers/v1/SendingBlueController";
import LogConfirmAndPayController from "./controllers/v1/LogConfirmAndPayController";
import AccountsController from "./controllers/v1/AccountsController";
import AccountsTypeController from "./controllers/v1/AccountsTypeController";
import AgenciesController from "./controllers/v1/AgenciesController";
import AgencyStoreController from "./controllers/v1/AgencyStoreController";
import UploadController from "./controllers/v1/UploadController";
import PassengerReservationController from "./controllers/v1/PassengerReservationController";
import ActionsController from "./controllers/v1/ActionsController";
import CustomerController from "./controllers/v1/CustomerController";
import BookingsController from "./controllers/v1/BookingsController";
import BookingsSyncController from "./controllers/v1/BookingsSyncController";
import DestinationController from "./controllers/v1/DestinationController";
import SuperAgenciesController from "./controllers/v1/SuperAgenciesController";
import AvailabilityController from "./controllers/v1/AvailabilityController";
import CitizenshipController from "./controllers/v1/CitizenshipController";
import BranchOfficeController from "./controllers/v1/BranchOfficeController";
import TourTypeController from "./controllers/v1/TourTypeController";
import ReservationStatusController from "./controllers/v1/ReservationStatusController";
import AviatorController from "./controllers/v1/AviatorController";
import LanguageController from "./controllers/v1/LanguageController";
import BambaApisController from "./controllers/v1/BambaApisController";
import SyncCheckController from "./controllers/v1/SyncCheckController";
import XeroConnectionController from "./controllers/v1/XeroConnectionController";
import XeroContactController from "./controllers/v1/XeroContactController";
import XeroTenantsController from "./controllers/v1/XeroTenantsController";
import XeroInvoiceController from "./controllers/v1/XeroInvoiceController";
import XeroItemsController from "./controllers/v1/XeroItemsController";
import path from "path";
import json2xls from "json2xls";

const rendertron = require("rendertron-middleware");

// parser data with bodyparser
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(compression());

// config headers http
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method,Access-Control-Allow-Origin, Cache-Control"
	);
	res.header("Access-Control-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

	next();
});

app.use(
	rendertron.makeMiddleware({
		proxyUrl: process.env.RENDERTRON_URL_PROXY,
		timeout: 500000,
	})
);

// routes
app.use(json2xls.middleware);

app.use("/api", TestController);
app.use("/api", ThemeCategoriesController);
app.use("/api", TravelStylesController);
app.use("/api", ThemeController);
app.use("/api", CountriesController);
app.use("/api", HomeController);
app.use("/api", InstagramController);
app.use("/api", RegionAttractionsController);
app.use("/api", RegionsController);
app.use("/api", SearchController);
app.use("/api", TopToursController);
app.use("/api", PackageController);
app.use("/api", PaymentMethodsController);
app.use("/api", CheckoutController);
app.use("/api", TravelAndExtrasController);
app.use("/api", HotelesController);
app.use("/api", LoginController);
app.use("/api", CalculatePriceController);
app.use("/api", TransportationController);
app.use("/api", ConfirmAndPayController);
app.use("/api", SeoController);
app.use("/api", ReservationController);
app.use("/api", StripeController);
app.use("/api", ContentPagesController);
app.use("/api", TailorMadeController);
app.use("/api", StaticDataController);
app.use("/api", ProdBambaSyncController);
app.use("/api", TourProductDetailsController);
app.use("/api", FullListController);
app.use("/api", PriceTourController);
app.use("/api", TransactionController);
app.use("/api", UpdateCustomFiledController);
app.use("/api", BambaSyncController);
app.use("/api", InsertTransactionForReservationController);
app.use("/api", SendingBlueController);
app.use("/api", LogConfirmAndPayController);
app.use("/api", AccountsController);
app.use("/api", AccountsTypeController);
app.use("/api", AgenciesController);
app.use("/api", AgencyStoreController);
app.use("/api", UploadController);
app.use("/api", PassengerReservationController);
app.use("/api", ActionsController);
app.use("/api", CustomerController);
app.use("/api", BookingsController);
app.use("/api", BookingsSyncController);
app.use("/api", DestinationController);
app.use("/api", SuperAgenciesController);
app.use("/api", AvailabilityController);
app.use("/api", CitizenshipController);
app.use("/api", BranchOfficeController);
app.use("/api", TourTypeController);
app.use("/api", ReservationStatusController);
app.use("/api", AviatorController);
app.use("/api", LanguageController);
app.use("/api", BambaApisController);
app.use("/api", SyncCheckController);
app.use("/api", XeroConnectionController);
app.use("/api", XeroContactController);
app.use("/api", XeroTenantsController);
app.use("/api", XeroInvoiceController);
app.use("/api", XeroItemsController);

app.use("/files", express.static("files", { redirect: false }));
app.use("/assets", express.static("assets", { redirect: false }));

app.use("/", express.static("angular/bamba-angular", { redirect: false }));
app.get("*", function (req, res, next) {
	res.sendFile(path.resolve("angular/bamba-angular/index.html"));
});

//app.use(express.static(path.join(__dirname, 'angular/bamba-angular')));

module.exports = app;
