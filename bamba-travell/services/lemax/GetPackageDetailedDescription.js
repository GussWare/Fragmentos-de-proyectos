import soap from "soap";
import LangHelper from "../../helpers/LanguageHelper";
import XMLElementsApi from "../lemax/XMLElementsApi";

export default class GetPackageDetailedDescription {
	constructor() {
		this.PackageTourID = null;
		this.PackageTourCode = null;
		this.NumberOfPersons = null;
		this.ChildrenAgeList = null;
		this.InPriceType = null;
		this.LanguageID = null;
		this.CurrencyID = null;
		this.OutParameterList = [];

		this.XMLElementsApi = new XMLElementsApi();
	}

	async getInt(arr) {
		return {
			int: arr,
		};
	}

	async GetPackageDetailedDescription() {
		return new Promise(async (resolve, reject) => {
			let params = {};

			if (this.PackageTourID) {
				params.PackageTourID = this.PackageTourID;
			}

			if (this.PackageTourCode) {
				params.PackageTourCode = this.PackageTourCode;
			}

			if (this.NumberOfPersons) {
				params.NumberOfPersons = this.NumberOfPersons;
			}

			if (this.ChildrenAgeList) {
				params.ChildrenAgeList = this.getInt(this.ChildrenAgeList);
			}

			if (this.CurrencyID) {
				params.CurrencyID = this.CurrencyID;
			}

			if (this.InPriceType) {
				params.InPriceType = this.InPriceType;
			}

			if (this.OutParameterList.length > 0) {
				if (typeof params.OutParameterList == "undefined") {
					params.OutParameterList = [];
				}

				params.OutParameterList = this.OutParameterList;
			}

			let args = {
				getPackageDetailedDescriptionParameters: params,
			};

			let headers = {
				AuthHeader: {
					Username: process.env.LEMAX_USER,
					Password: process.env.LEMAX_PASSWORD,
				},
			};

			soap.createClient(
				process.env.LEMAX_WSDL,
				{ forceSoap12Headers: true, envelopeKey: "soap12" },
				(err, client) => {
					if (err) {
						reject(err);
					} else {
						client.addSoapHeader(headers);
						client.GetPackageDetailedDescription(args, (err, result) => {
							if (err) {
								reject(err);
							} else {
								resolve(result);
							}
						});
					}
				}
			);
		});
	}
}
