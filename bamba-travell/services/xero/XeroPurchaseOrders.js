import { TokenSet } from "openid-client";
import {
	Account,
	Accounts,
	AccountType,
	Allocation,
	Allocations,
	BankTransaction,
	BankTransactions,
	BankTransfer,
	BankTransfers,
	BatchPayment,
	BatchPayments,
	Contact,
	ContactGroup,
	ContactGroups,
	ContactPerson,
	Contacts,
	Currency,
	CurrencyCode,
	Employees,
	HistoryRecords,
	Invoice,
	Invoices,
	Item,
	Items,
	LineAmountTypes,
	LineItem,
	LinkedTransaction,
	LinkedTransactions,
	ManualJournal,
	ManualJournals,
	Payment,
	Payments,
	PaymentServices,
	Prepayment,
	PurchaseOrder,
	PurchaseOrders,
	Quote,
	Quotes,
	Receipt,
	Receipts,
	TaxRate,
	TaxRates,
	TaxType,
	TrackingCategories,
	TrackingCategory,
	TrackingOption,
	XeroAccessToken,
	XeroClient,
	XeroIdToken,
	CreditNotes,
	CreditNote,
	Employee,
} from "xero-node";

import OAuthTokensRepository from "./repository/OAuthTokensRepository";
import TenantsRepository from "./repository/TenantsRepository";
import PurchaseOrdersXeroInterface from "../../interface/xero/PurchaseOrdersXeroInterface";

export default class XeroPurchaseOrders {
	constructor() {
		this.OAuthTokensRepository = new OAuthTokensRepository();
		this.TenantsRepository = new TenantsRepository();
	}

	/**
	 * Metodo que se encarga de sincronizar los tenants
	 */
	async createPurchaseOrders(
		ContactID,
		DateCreation,
		DelivaryDate,
		Reference,
		CurrencyCode,
		Status,
		LineAmountTypes,
		LineItems
	) {
		let Result = {
			Success: false,
			Messages: [],
			Data: {
				purchaseOrders: [],
			},
		};

		const oAuthToken = await this.OAuthTokensRepository.findOne();

		if (!oAuthToken) {
			throw new Error(`NO HAY TOKEN EN LA BASE DE DATOS.`);
		}

		const xero = new XeroClient({
			clientId: process.env.XERO_CLIENT_ID,
			clientSecret: process.env.XERO_CLIENT_SECRET,
			redirectUris: [process.env.XERO_REDIRECT_URI],
			scopes: process.env.XERO_SCOPES.split(" "),
		});

		await xero.buildConsentUrl();
		await xero.setTokenSet(oAuthToken);

		const newPurchaseOrder = await PurchaseOrdersXeroInterface.getPurchaseOrders();
		newPurchaseOrder.contact.contactID = ContactID;
		newPurchaseOrder.reference = Reference;
		newPurchaseOrder.CurrencyCode = CurrencyCode;
		newPurchaseOrder.Status = Status;
		newPurchaseOrder.DateCreation = DateCreation;
		newPurchaseOrder.DelivaryDate = DelivaryDate;
		newPurchaseOrder.LineAmountTypes = LineAmountTypes;
		newPurchaseOrder.LineItems = LineItems;

		const purchaseOrders = new PurchaseOrders();
		purchaseOrders.purchaseOrders = [newPurchaseOrder];

		const createdPurchaseOrder = await xero.accountingApi.createPurchaseOrders(
			process.env.XERO_TENANT_ID,
			purchaseOrders,
			false
		);

		for (let i = 0; i < createdPurchaseOrder.body.purchaseOrders.length; i++) {
			if (createdPurchaseOrder.body.purchaseOrders[i].hasErrors) {
				Result.Messages =
					createdPurchaseOrder.body.purchaseOrders[i].validationErrors;
			} else {
				Result.Data.purchaseOrders.push(
					createdPurchaseOrder.body.purchaseOrders[i]
				);
			}
		}

		Result.Success = Result.Messages.length === 0 ? true : false;

		return Result;
	}
}
