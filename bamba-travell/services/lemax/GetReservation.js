import soap from 'soap';

export default class GetReservation {

    constructor() {
        this.ReservationID = null;
        this.LanguageID = null;
    }

    GetReservation() {
        return new Promise((resolve, reject) => {
            let params = {};

            if(this.ReservationID) {
                params.ReservationID = this.ReservationID;
            }

            if(this.LanguageID) {
                params.LanguageID = this.LanguageID;
            }

            let args = {
                getReservationParameters: params
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
                    client.GetReservation(args, (err, result) => {
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