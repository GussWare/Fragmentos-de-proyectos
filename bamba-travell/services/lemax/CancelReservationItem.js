import soap from "soap";

export default class CancelReservationItem {
	constructor() {
		this.ReservationItemID = null;
		this.LanguageID = null;
		this.UserID = null;
		this.CancellationReason = null;
		this.CancelReservationIfAllItemsCancelled = null;
	}

	async cancelReservationItem() {
		return new Promise((resolve, reject) => {
			let params = {};

			if (this.ReservationItemID) {
				params.ReservationItemID = this.ReservationItemID;
			}

			if (this.LanguageID) {
				params.LanguageID = this.LanguageID;
			}

			if (this.UserID) {
				params.UserID = this.UserID;
			}

			if (this.CancellationReason) {
				params.CancellationReason = this.CancellationReason;
			}

			if (this.CancelReservationIfAllItemsCancelled) {
				params.CancelReservationIfAllItemsCancelled = this.CancelReservationIfAllItemsCancelled;
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
						client.CancelReservationItem(args, (err, result) => {
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
