import { json } from "body-parser";
import { response } from "express";
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
import AgencyStoreModel from "../../models/AgencyStoreModel";
import OAuthTokensRepository from "./repository/OAuthTokensRepository";
import TenantsRepository from "./repository/TenantsRepository";

export default class XeroContact {
	constructor() {
		this.OAuthTokensRepository = new OAuthTokensRepository();
		this.TenantsRepository = new TenantsRepository();
	}

	async getContacts(params) {
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

		const tanant = await this.TenantsRepository.findTenantDefault();

		let where = "";

		if (params.ContactNumber) {
			where = `ContactNumber == "${params.ContactNumber}"`;
		}

		const contactsGetResponse = await xero.accountingApi.getContacts(
			tanant.tenantId,
			null,
			where
		);

		if (
			contactsGetResponse.response.statusCode != global.constants.STATUS_200_OK
		) {
			throw new Error(`NO SE PUEDEN RECUPERA LOS CONTACTOS EN XERO.`);
		}

		const contacts = contactsGetResponse.body.contacts || [];

		return contacts;
	}

	async createContacts(name, emailAddress, customerID) {
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

		let contact = {
			firstName: `${name} : ${customerID}`,
			name: name,
			emailAddress: emailAddress,
			contactNumber: customerID,
		};

		const tanant = await this.TenantsRepository.findTenantDefault();
		const newContacts = new Contacts();
		newContacts.contacts = [contact];

		const response = await xero.accountingApi.createContacts(
			tanant.tenantId,
			newContacts
		);

		if (response.response.statusCode != global.constants.STATUS_200_OK) {
			throw new Error(`NO SE PUDO GUARDAR EL CONTACTO EN XERO.`);
		}

		const contactResponse = response.body.contacts[0];

		return contactResponse;
	}
}
