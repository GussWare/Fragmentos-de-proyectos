export default class XMLElementsApi {
	constructor() {}

	async getInt(arr) {
		return {
			int: arr,
		};
	}

	async getLong(arr) {
		return {
			long: arr,
		};
	}

	async getOutParameterFilterList(OutParameterFilterList) {
		return await this.getOutParameter(OutParameterFilterList);
	}

	async getOutParameter(OutParameter) {
		return {
			OutParameter: OutParameter,
		};
	}

	async getAttrFilterByValue(ID, Value, ComparisonType) {
		return {
			AttributeFilter: {
				AttributeID: ID,
				AttributeValue: Value,
				ComparisonType: ComparisonType,
			},
		};
	}

	async getAttrFilterByValue1Value2(ID, startDay, endDay, ComparisonType) {
		return {
			AttributeFilter: {
				AttributeID: ID,
				AttributeValue: startDay,
				AttributeValue2: endDay,
				ComparisonType: ComparisonType,
			},
		};
	}

	async getSortParameter(SortBy, SortOrder) {
		return {
			SortParameter: {
				SortBy: SortBy,
				SortOrder: SortOrder,
			},
		};
	}

	async getSortCustomParameter(SortBy, SortOrder, AttributeID, AttributeType) {
		return {
			SortParameter: {
				SortBy: SortBy,
				SortOrder: SortOrder,
				AttributeID: AttributeID,
				AttributeType: AttributeType,
			},
		};
	}

	async getUnsignedByte(unsignedData) {
		return {
			unsignedByte: unsignedData,
		};
	}

	async getAttrOutParameter(arr) {
		return {
			OutParameter: arr,
		};
	}

	async getPassengerConfigurationFilter(PassengerConfigurationFilterList) {
		let passegerConfigList = [];
		let passengerItem = {};

		if (Array.isArray(PassengerConfigurationFilterList)) {
			if (PassengerConfigurationFilterList.length > 0) {
				for (const i in PassengerConfigurationFilterList) {
					passengerItem = {};
					passengerItem.RoomsNumber =
						PassengerConfigurationFilterList[i].RoomsNumber;
					passengerItem.AdultsNumber =
						PassengerConfigurationFilterList[i].AdultsNumber;

					if (PassengerConfigurationFilterList[i].ChildrenAges.length > 0) {
						passengerItem.ChildrenAges = await this.getInt(
							PassengerConfigurationFilterList[i].ChildrenAges
						);
					}

					passegerConfigList.push(passengerItem);
				}
			}
		}

		return {
			PassengerConfigurationFilter: passegerConfigList,
		};
	}
}
