import XeroOAuthTokensModel from "../../../models/XeroOAuthTokensModel";

export default class OAuthTokensRepository {
	constructor() {}

	/**
	 *
	 */
	async findOne() {
		const oAuthToken = await XeroOAuthTokensModel.findOne();
		return oAuthToken;
	}

	/**
	 *
	 * @param {*} id_token
	 * @param {*} access_token
	 * @param {*} expires_at
	 * @param {*} token_type
	 * @param {*} refresh_token
	 * @param {*} scope
	 * @param {*} session_state
	 */
	async save(
		id_token,
		access_token,
		expires_at,
		token_type,
		refresh_token,
		scope,
		session_state
	) {
		await XeroOAuthTokensModel.deleteMany();

		const xeroOAuthTokensModel = new XeroOAuthTokensModel();
		xeroOAuthTokensModel.id_token = id_token;
		xeroOAuthTokensModel.access_token = access_token;
		xeroOAuthTokensModel.expires_at = expires_at;
		xeroOAuthTokensModel.token_type = token_type;
		xeroOAuthTokensModel.refresh_token = refresh_token;
		xeroOAuthTokensModel.scope = scope;
		xeroOAuthTokensModel.session_state = session_state;

		return await xeroOAuthTokensModel.save();
	}
}
