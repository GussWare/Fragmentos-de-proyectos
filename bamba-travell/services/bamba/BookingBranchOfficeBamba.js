import BranchOfficeModel from "../../models/BranchOfficeModel";

export default class BookingBranchOfficeBamba {
	constructor() {}

	async getBranchOfficeSlug(OfficeID) {
		let BranchName = null;
		let BranchOfficeCollection = await BranchOfficeModel.findOne({
			lemaxId: parseInt(OfficeID),
		});
		if (BranchOfficeCollection) {
			BranchName = BranchOfficeCollection.slug;
		}

		return BranchName;
	}

	async getBranchOfficeName(OfficeID) {
		let BranchName = null;
		let BranchOfficeCollection = await BranchOfficeModel.findOne({
			lemaxId: parseInt(OfficeID),
		});
		if (BranchOfficeCollection) {
			BranchName = BranchOfficeCollection.name;
		}

		return BranchName;
	}
}
