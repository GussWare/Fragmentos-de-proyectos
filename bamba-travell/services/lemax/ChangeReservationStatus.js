import soap from 'soap';

export default class ChangeReservationStatus {

    constructor() {
        this.ReservationID = null;
        this.StatusID = null;
    }

    ChangeReservationStatus() {
        return new Promise((resolve, reject) => {
            let params = {};

            if(this.ReservationID) {
                params.ReservationID = this.ReservationID;
            }

            if(this.StatusID) {
                params.StatusID = this.StatusID;
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
                    client.ChangeReservationStatus(args, (err, result) => {
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