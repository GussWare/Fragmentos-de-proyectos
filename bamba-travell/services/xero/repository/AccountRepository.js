import XeroAccountModel from "../../../models/XeroAccountModel";

export default class AccountRepository {
	constructor() {}

	async findOne(id) {
		const oAuthToken = await XeroAccountModel.findOne({ _id: id });
		return oAuthToken;
	}

	async findOneByField(field, search) {
		let find = {};
		find[field] = search;

		let tenant = await XeroAccountModel.findOne(find);
		return tenant;
	}

	async findCount(find = {}) {
		let conta = await XeroAccountModel.countDocuments(find);
		return conta;
	}

	async deleteAll() {
		await XeroAccountModel.deleteMany({});
	}

	async save(
		AccountID,
		Name,
		Status,
		Type,
		TaxType,
		Class,
		EnablePaymentsToAccount,
		ShowInExpenseClaims,
		BankAccountNumber,
		BankAccountType,
		CurrencyCode,
		ReportingCode,
		ReportingCodeName,
		HasAttachments,
		UpdatedDateUTC,
		AddToWatchlist
	) {
		const xeroAccountModel = new XeroAccountModel();
		xeroAccountModel.AccountID = AccountID;
		xeroAccountModel.Name = Name;
		xeroAccountModel.Status = Status;
		xeroAccountModel.Type = Type;
		xeroAccountModel.TaxType = TaxType;
		xeroAccountModel.Class = Class;
		xeroAccountModel.EnablePaymentsToAccount = EnablePaymentsToAccount;
		xeroAccountModel.ShowInExpenseClaims = ShowInExpenseClaims;
		xeroAccountModel.BankAccountNumber = BankAccountNumber;
		xeroAccountModel.BankAccountType = BankAccountType;
		xeroAccountModel.CurrencyCode = CurrencyCode;
		xeroAccountModel.ReportingCode = ReportingCode;
		xeroAccountModel.ReportingCodeName = ReportingCodeName;
		xeroAccountModel.HasAttachments = HasAttachments;
		xeroAccountModel.UpdatedDateUTC = UpdatedDateUTC;
		xeroAccountModel.AddToWatchlist = AddToWatchlist;

		return await xeroAccountModel.save();
	}
}
