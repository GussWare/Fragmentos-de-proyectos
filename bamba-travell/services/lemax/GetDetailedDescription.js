import soap from 'soap';
import LangHelper from '../../helpers/LanguageHelper';

export default class GetDetailedDescription {

    constructor() {
        this.ObjectID = null;
        this.InPriceType = null;
        this.LanguageID = null;
        this.CurrencyID = null;
        this.StartDate = null;
        this.EndDate = null;
        this.OutParameterList = [];
    }

    GetDetailedDescription() {

        return new Promise((resolve, reject) => {

            let params = {};

            if (this.ObjectID) {
                params.ObjectID = this.ObjectID;
            }

            if (this.CurrencyID) {
                params.CurrencyID = this.CurrencyID;
            }

            if (this.InPriceType) {
                params.InPriceType = this.InPriceType;
            }

            if (this.StartDate) {
                params.StartDate = this.StartDate;
            }

            if (this.EndDate) {
                params.EndDate = this.EndDate;
            }

            if (Array.isArray(this.OutParameterList)) {
                if (this.OutParameterList.length > 0) {
                    if (typeof params.OutParameterList == "undefined") {
                        params.OutParameterList = [];
                    }

                    params.OutParameterList = this.OutParameterList;
                }
            }

            let args = {
                getDetailedDescriptionParameters: params
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
                    client.GetDetailedDescription(args, (err, result) => {
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