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

import OAuthTokensRepository from "./repository/OAuthTokensRepository";
import TenantsRepository from "./repository/TenantsRepository";
import AccountRepository from "./repository/AccountRepository";

export default class XeroApp {
	constructor() {
		this.OAuthTokensRepository = new OAuthTokensRepository();
		this.TenantsRepository = new TenantsRepository();
		this.AccountRepository = new AccountRepository();
	}

	/**
	 * Metodo que se encarga de retornar una url valida para establecer
	 * la conexion de login con xero
	 *
	 * @returns {string}
	 */
	async getBuildConsentUrl() {
		const xero = new XeroClient({
			clientId: process.env.XERO_CLIENT_ID,
			clientSecret: process.env.XERO_CLIENT_SECRET,
			redirectUris: [process.env.XERO_REDIRECT_URI],
			scopes: process.env.XERO_SCOPES.split(" "),
		});
		const consentUrl = (await xero.buildConsentUrl()) || null;
		return consentUrl;
	}

	/**
	 * Metodo que se encarga de validar y generar un token valido
	 *
	 * @param {String} urlCallback
	 */
	async authorizationCallback(urlCallback) {
		const xero = new XeroClient({
			clientId: process.env.XERO_CLIENT_ID,
			clientSecret: process.env.XERO_CLIENT_SECRET,
			redirectUris: [process.env.XERO_REDIRECT_URI],
			scopes: process.env.XERO_SCOPES.split(" "),
		});
		await xero.buildConsentUrl();

		const token = await xero.apiCallback(urlCallback);

		if (!token) {
			throw new Error(`NO SE RETORNO TOKEN.`);
		}

		const AuthTokens = await this.OAuthTokensRepository.save(
			token.id_token,
			token.access_token,
			token.expires_at,
			token.token_type,
			token.refresh_token,
			token.scope,
			token.session_state
		);

		return AuthTokens;
	}

	/**
	 * Metodo que se encarga de realizar el refresh del token
	 *
	 * @return {String}
	 */
	async refreshToken() {
		const oAuthToken = await this.OAuthTokensRepository.findOne();
		console.log("oAuthToken", JSON.stringify(oAuthToken));

		if (!oAuthToken) {
			throw new Error(`NO SE RECUPERO TOKEN EN LA BASE DE DATOS.`);
		}

		const xero = new XeroClient({
			clientId: process.env.XERO_CLIENT_ID,
			clientSecret: process.env.XERO_CLIENT_SECRET,
			redirectUris: [process.env.XERO_REDIRECT_URI],
			scopes: process.env.XERO_SCOPES.split(" "),
		});

		await xero.buildConsentUrl();
		await xero.setTokenSet(oAuthToken);

		const newToken = await xero.refreshToken();

		const AuthTokens = await this.OAuthTokensRepository.save(
			newToken.id_token,
			newToken.access_token,
			newToken.expires_at,
			newToken.token_type,
			newToken.refresh_token,
			newToken.scope,
			newToken.session_state
		);

		return AuthTokens;
	}
}
