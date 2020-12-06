import XeroTenantsModel from "../../../models/XeroTenantsModel";

export default class TenantsRepository {
	constructor() {}

	/**
	 *
	 * @param {*} id
	 */
	async findOne(id) {
		const oAuthToken = await XeroTenantsModel.findOne({ _id: id });
		return oAuthToken;
	}

	/**
	 *
	 * @param {*} field
	 * @param {*} search
	 */
	async findOneByField(field, search) {
		let find = {};
		find[field] = search;

		let tenant = await XeroTenantsModel.findOne(find);
		return tenant;
	}

	async findCount(find = {}) {
		let conta = await XeroTenantsModel.countDocuments(find);
		return conta;
	}

	/**
	 *
	 * @param {*} tenanId
	 */
	async findOneByTenanId(tenanId) {
		let tenan = await this.findOneByField("tenantId", tenanId);
		return tenan;
	}

	async findOneByTenanBambaType(tenanId) {
		let tenan = await this.findOneByField("tenantBambaType", tenanId);
		return tenan;
	}

	async findTenantDefault() {
		const tenant = await this.findOneByTenanBambaType(
			global.constants.XERO_BAMBA_TENANT_TYPE_BAMBA_ORGANISATION
		);

		return tenant;
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
		id,
		authEventId,
		tenantId,
		tenantType,
		tenantName,
		createdDateUtc,
		updatedDateUtc
	) {
		const xeroTenantsModel = new XeroTenantsModel();
		xeroTenantsModel.id = id;
		xeroTenantsModel.authEventId = authEventId;
		xeroTenantsModel.tenantId = tenantId;
		xeroTenantsModel.tenantType = tenantType;
		xeroTenantsModel.tenantName = tenantName;
		xeroTenantsModel.createdDateUtc = createdDateUtc;
		xeroTenantsModel.updatedDateUtc = updatedDateUtc;

		return await xeroTenantsModel.save();
	}
}
