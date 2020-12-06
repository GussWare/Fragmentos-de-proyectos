import soap from "soap";
import LangHelper from "../../helpers/LanguageHelper";
import XMLElementsApi from "../lemax/XMLElementsApi";

export default class GetPackageSearchResults {
	constructor() {
		this.ID = null;
		this.IDList = [];
		this.CountryIDList = [];
		this.StyleIDList = [];
		this.PriceFrom = 0;
		this.PriceTo = 0;
		this.StartDate = 0;
		this.InPriceType = null;
		this.EndDate = 0;
		this.StartDestination = null;
		this.EndDestination = null;
		this.ThemeIDList = [];
		this.BambaRecommendedTrip = null;
		this.ParentIDFilter = null;
		this.ShowFileds = [];
		this.PackageTourIDList = [];
		this.OnlyOnSpecialOffer = null;
		this.CurrencyID = null;
		this.SortBy = null;
		this.SortOrder = null;
		this.PageSize = null;
		this.CurrentPage = null;
		this.LanguageID = null;
		this.ObjectTypeIDList = null;
		this.IgnoreCapacity = null;
		this.StartDateSearch = null;
		this.EndDateSearch = null;

		this.XMLElementsApi = new XMLElementsApi();
	}

	async GetPackageSearchResults() {
		return new Promise(async (resolve, reject) => {
			let params = {};

			// Filter by IDs OK
			if (this.IDList.length > 0) {
				params.ObjectIDList = await this.XMLElementsApi.getInt(this.IDList);
			}

			//Filtro por style  OK
			if (this.StyleIDList.length > 0) {
				params.CategoryIDListIntersection = await this.XMLElementsApi.getInt(
					this.StyleIDList
				);
			}

			// Filtro por pais OK
			if (this.CountryIDList.length > 0) {
				params.CountryIDList = await this.XMLElementsApi.getLong(
					this.CountryIDList
				);
			}

			// Filtro por precio
			if (this.PriceFrom > 0 && this.PriceTo > 0) {
				params.PriceFrom = this.PriceFrom;
				params.PriceTo = this.PriceTo;
			}

			if (this.InPriceType) {
				params.InPriceType = this.InPriceType;
			}

			// Filtro por rango de dias OK
			if (this.StartDate > 0 && this.EndDate > 0) {
				if (typeof params.ObjectAttributeFilterList == "undefined") {
					params.ObjectAttributeFilterList = [];
				}

				params.ObjectAttributeFilterList.push(
					await this.XMLElementsApi.getAttrFilterByValue1Value2(
						global.constants.FILTER_DURATION_IN_DAYS,
						this.StartDate,
						this.EndDate,
						global.constants.FILTER_COMPARASION_TYPE_BETWEEN
					)
				);
			}

			// Filtro por themas
			if (this.ThemeIDList.length > 0) {
				if (typeof params.ObjectAttributeFilterList == "undefined") {
					params.ObjectAttributeFilterList = [];
				}

				for (const i in this.ThemeIDList) {
					params.ObjectAttributeFilterList.push(
						await this.XMLElementsApi.getAttrFilterByValue(
							this.ThemeIDList[i],
							1,
							global.constants.FILTER_COMPARASION_TYPE_EQUALS
						)
					);
				}
			}

			if (this.BambaRecommendedTrip) {
				if (typeof params.ObjectAttributeFilterList == "undefined") {
					params.ObjectAttributeFilterList = [];
				}

				params.ObjectAttributeFilterList.push(
					await this.XMLElementsApi.getAttrFilterByValue(
						global.constants.ATTRIBUTE_AUTHENTIC_BAMBA,
						1,
						global.constants.FILTER_COMPARASION_TYPE_EQUALS
					)
				);
			}

			if (this.ParentIDFilter != null) {
				if (typeof params.ObjectAttributeFilterList == "undefined") {
					params.ObjectAttributeFilterList = [];
				}

				params.ObjectAttributeFilterList.push(
					await this.XMLElementsApi.getAttrFilterByValue(
						global.constants.ATTRIBUTE_PARENT_ID,
						this.ParentIDFilter,
						global.constants.FILTER_COMPARASION_TYPE_EQUALS
					)
				);
			}

			if (this.PackageTourIDList.length > 0) {
				params.PackageTourIDList = await this.XMLElementsApi.getInt(
					this.PackageTourIDList
				);
			}

			if (this.OnlyOnSpecialOffer) {
				params.OnlyOnSpecialOffer = this.OnlyOnSpecialOffer;
			}

			if (this.ShowFileds.length > 0) {
				if (typeof params.OutParameterList == "undefined") {
					params.OutParameterList = [];
				}

				params.OutParameterList = await this.XMLElementsApi.getAttrOutParameter(
					this.ShowFileds
				);
			}

			if (this.StartDateSearch) {
				params.StartDate = this.StartDateSearch;
			}

			if (this.EndDateSearch) {
				params.EndDate = this.EndDateSearch;
			}

			if (this.ObjectTypeIDList) {
				if (this.ObjectTypeIDList.length > 0) {
					params.ObjectTypeIDList = await this.XMLElementsApi.getUnsignedByte(
						this.ObjectTypeIDList
					);
				}
			}

			if (this.IgnoreCapacity) {
				params.IgnoreCapacity = this.IgnoreCapacity;
			}

			if (this.CurrencyID) {
				params.CurrencyID = this.CurrencyID;
			}

			if (this.LanguageID) {
				params.LanguageID = this.LanguageID;
			} else {
				params.LanguageID = await LangHelper.getLang();
			}

			if (this.SortBy && this.SortOrder) {
				if (this.SortBy == "Price") {
					params.SortParameterList = [];
					params.SortParameterList.push(
						await this.XMLElementsApi.getSortParameter(
							this.SortBy.trim(),
							this.SortOrder.trim()
						)
					);
				}

				if (this.SortBy == "Duration") {
					params.SortParameterList = [];
					params.SortParameterList.push(
						await this.XMLElementsApi.getSortCustomParameter(
							global.constants.FILTER_CUSTOM_ATRIBUTE,
							this.SortOrder.trim(),
							global.constants.ATTRIBUTE_DURATION_DD,
							global.constants.ATTRIBUTE_TYPE_NUMERIC
						)
					);
				}
			}

			if (this.CurrentPage) {
				params.CurrentPage = this.CurrentPage;
			}

			if (this.PageSize) {
				params.PageSize = this.PageSize;
			}

			let args = {
				getPackageSearchResultsParameters: params,
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
						client.GetPackageSearchResults(args, (err, result) => {
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
