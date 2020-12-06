import soap from "soap";
import XMLElementsApi from "../lemax/XMLElementsApi";

export default class GetAllReservations {
	constructor() {
		this.LanguageID = null;
		this.ReservationNumber = null;
		this.CustomerID = null;
		this.ReservationCreationDateFrom = null;
		this.ReservationCreationDateTo = null;
		this.ReservationModifiedDateFrom = null;
		this.ReservationModifiedDateTo = null;
		this.PageSize = null;
		this.CurrentPage = null;
		this.FetchDocuments = null;
		this.SortParameters = null;
		this.SortBy = null;
		this.SortOrder = null;
		this.UserID = null;
		this.ReservationStatuses = null;
		this.CancellationDeadlineFrom = null;
		this.CancellationDeadlineTo = null;
		this.ReservationStart = null;
		this.ReservationEnd = null;
		this.PassengerName = null;
		this.CustomFieldIDListForFetching = null;
		this.ReservationItemSupplierStatusIDs = null;

		this.XMLElementsApi = new XMLElementsApi();
	}

	GetAllReservations() {
		return new Promise(async (resolve, reject) => {
			let params = {};

			if (this.LanguageID) {
				params.LanguageID = this.LanguageID;
			}

			if (this.ReservationNumber) {
				params.ReservationNumber = this.ReservationNumber;
			}

			if (this.CustomerID) {
				params.CustomerID = this.CustomerID;
			}

			if (this.ReservationCreationDateFrom) {
				params.ReservationCreationDateFrom = this.ReservationCreationDateFrom;
			}

			if (this.ReservationCreationDateTo) {
				params.ReservationCreationDateTo = this.ReservationCreationDateTo;
			}

			if (this.ReservationModifiedDateFrom) {
				params.ReservationModifiedDateFrom = this.ReservationModifiedDateFrom;
			}

			if (this.ReservationModifiedDateTo) {
				params.ReservationModifiedDateTo = this.ReservationModifiedDateTo;
			}

			if (this.PageSize) {
				params.PageSize = this.PageSize;
			}

			if (this.CurrentPage) {
				params.CurrentPage = this.CurrentPage;
			}

			if (this.FetchDocuments) {
				params.FetchDocuments = this.FetchDocuments;
			}

			if (this.SortBy && this.SortOrder) {
				params.SortParameters = await this.XMLElementsApi.getSortParameter(
					this.SortBy,
					this.SortOrder
				);
			}

			if (this.UserID) {
				params.UserID = this.UserID;
			}

			if (this.ReservationStatuses) {
				params.ReservationStatuses = this.ReservationStatuses;
			}

			if (this.CancellationDeadlineFrom) {
				params.CancellationDeadlineFrom = this.CancellationDeadlineFrom;
			}

			if (this.CancellationDeadlineTo) {
				params.CancellationDeadlineTo = this.CancellationDeadlineTo;
			}

			if (this.ReservationStart) {
				params.ReservationStart = this.ReservationStart;
			}

			if (this.ReservationEnd) {
				params.ReservationEnd = this.ReservationEnd;
			}

			if (this.PassengerName) {
				params.PassengerName = this.PassengerName;
			}

			if (this.CustomFieldIDListForFetching) {
				params.CustomFieldIDListForFetching = await this.XMLElementsApi.getInt(
					this.CustomFieldIDListForFetching
				);
			}

			if (this.ReservationItemSupplierStatusIDs) {
				params.ReservationItemSupplierStatusIDs = this.ReservationItemSupplierStatusIDs;
			}

			let args = {
				request: params,
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
						client.GetAllReservations(args, (err, result) => {
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
