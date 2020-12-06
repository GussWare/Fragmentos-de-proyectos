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
import XeroInvoiceInterface from "../../interface/xero/InvoceXeroInterface";

export default class XeroInvoce {
	constructor() {
		this.OAuthTokensRepository = new OAuthTokensRepository();
		this.TenantsRepository = new TenantsRepository();
	}

	/**
	 * Metodo que se encarga de sincronizar los tenants
	 */
	async createInvoce(
		InvoceType,
		ContactID,
		DateCreation,
		DueDate,
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
				invoices: [],
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

		const InvoceCreate = await XeroInvoiceInterface.getInvoice();
		InvoceCreate.type = InvoceType;
		InvoceCreate.contact.contactID = ContactID;
		InvoceCreate.reference = Reference;
		InvoceCreate.currencyCode = CurrencyCode;
		InvoceCreate.status = Status;
		InvoceCreate.date = DateCreation;
		InvoceCreate.lineAmountTypes = LineAmountTypes;
		InvoceCreate.lineItems = LineItems;

		const newInvoices = new Invoices();
		newInvoices.invoices = [InvoceCreate];

		const createdInvoice = await xero.accountingApi.createInvoices(
			process.env.XERO_TENANT_ID,
			newInvoices,
			false
		);

		for (let i = 0; i < createdInvoice.body.invoices.length; i++) {
			if (createdInvoice.body.invoices[i].hasErrors) {
				Result.Messages = createdInvoice.body.invoices[i].validationErrors;
			} else {
				Result.Data.invoices.push(createdInvoice.body.invoices[i]);
			}
		}

		Result.Success = Result.Messages.length === 0 ? true : false;

		return Result;
	}
}
