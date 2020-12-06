import soap from 'soap';

export default class InsertTransactionForReservation {

    constructor() {
        this.ReservationID = null;
        this.TransactionAmount = null;
        this.CurrencyID = null;
        this.TransactionTime = null;
        this.TransactionReferenceNumber = null;
        this.PaymentMethodID = null;
    }

    InsertTransactionForReservation() {
        return new Promise((resolve, reject) => {
            let params = {};

            if (this.ReservationID) {
                params.ReservationID = this.ReservationID;
            }

            if (this.TransactionAmount) {
                params.TransactionAmount = this.TransactionAmount;
            }

            if (this.CurrencyID) {
                params.CurrencyID = this.CurrencyID;
            }

            if (this.TransactionTime) {
                params.TransactionTime = this.TransactionTime;
            }

            if (this.TransactionReferenceNumber) {
                params.TransactionReferenceNumber = this.TransactionReferenceNumber;
            }

            if (this.PaymentMethodID) {
                params.PaymentMethodID = this.PaymentMethodID;
            }

            let args = {
                request: params
            };

            let headers = {
                "AuthHeader": {
                    "Username": process.env.LEMAX_USER,
                    "Password": process.env.LEMAX_PASSWORD
                }
            };

            soap.createClient(process.env.LEMAX_WSDL, { forceSoap12Headers: true, envelopeKey: 'soap12' }, (err, client) => {
                if (err) {
                    reject(err);
                } else {
                    client.addSoapHeader(headers);
                    client.InsertTransactionForReservation(args, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                }
            });
        });
    }
}