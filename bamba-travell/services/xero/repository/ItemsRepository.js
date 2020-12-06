import XeroItemsModel from "../../../models/XeroItemsModel";

export default class AccountRepository {
	constructor() {}

	async save(
		itemID,
		code,
		name,
		isSold,
		isPurchased,
		description,
		purchaseDescription,
		purchaseDetails,
		salesDetails,
		isTrackedAsInventory,
		inventoryAssetAccountCode,
		totalCostPool,
		quantityOnHand,
		updatedDateUTC
	) {
		const xeroItemsModel = new XeroItemsModel();
		xeroItemsModel.itemID = itemID;
		xeroItemsModel.code = code;
		xeroItemsModel.name = name;
		xeroItemsModel.isSold = isSold;
		xeroItemsModel.isPurchased = isPurchased;
		xeroItemsModel.description = description;
		xeroItemsModel.purchaseDescription = purchaseDescription;
		xeroItemsModel.purchaseDetails = purchaseDetails;
		xeroItemsModel.salesDetails = salesDetails;
		xeroItemsModel.isTrackedAsInventory = isTrackedAsInventory;
		xeroItemsModel.inventoryAssetAccountCode = inventoryAssetAccountCode;
		xeroItemsModel.totalCostPool = totalCostPool;
		xeroItemsModel.quantityOnHand = quantityOnHand;
		xeroItemsModel.updatedDateUTC = updatedDateUTC;

		return await xeroItemsModel.save();
	}

	async deleteBulk() {
		await XeroItemsModel.deleteMany();
	}
}
