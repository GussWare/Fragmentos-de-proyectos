import soap from 'soap';

export default class InsertReservation {

    constructor() {
        this.ExecuteInsert = null;
        this.PaymentMethodID = null;
        this.CurrencyID = null;
        this.Customer = null;
        this.CustomerType = null;
        this.CustomerObject = null;
        this.ReservationItems = null;
        this.AdHocReservationItems = null;
        this.LanguageID = null;
        this.ReservationCustomFields = null;
        this.BranchOfficeGUID = null;

        this.ReservationContaItems = 1;
    }

    async getCustumer(Customer, CustomerType) {
        let customerObject = {};

        if (Customer) {
            customerObject.Email = Customer;
        }

        if (CustomerType) {
            customerObject.CustomerType = CustomerType;
        }

        return customerObject;
    }

    async getReservationItems(ReservationItems) {
        let insertReservationItemRQ = [];
        let item = {};
        let passenger = {};
        let insertReservationPassengerRQ = [];
        let services = {};
        let insertReservationServiceRQ = [];

        if (Array.isArray(ReservationItems)) {
            for (const i in ReservationItems) {

                item = {};
                insertReservationServiceRQ = [];
                insertReservationPassengerRQ = [];

                item.ReservationItemOrder = this.ReservationContaItems;

                if (typeof ReservationItems[i].UnitID != "undefined") {
                    item.UnitID = ReservationItems[i].UnitID;
                }

                if (typeof ReservationItems[i].StartDate != "undefined") {
                    item.StartDate = ReservationItems[i].StartDate;
                }

                if (typeof ReservationItems[i].EndDate != "undefined") {
                    item.EndDate = ReservationItems[i].EndDate;
                }

                if (typeof ReservationItems[i].ClientComment != "undefined") {
                    item.ClientComment = ReservationItems[i].ClientComment;
                }

                if (typeof ReservationItems[i].Passengers != "undefined") {

                    for (const j in ReservationItems[i].Passengers) {
                        passenger = ReservationItems[i].Passengers[j];
                        insertReservationPassengerRQ.push(passenger);
                    }

                    item.Passengers = {
                        InsertReservationPassengerRQ: insertReservationPassengerRQ
                    };
                }

                if (typeof ReservationItems[i].SelectedServices != "undefined") {

                    for (const j in ReservationItems[i].SelectedServices) {
                        services = {};

                        if (typeof ReservationItems[i].SelectedServices[j].ServiceID != "undefined") {
                            services.ServiceID = ReservationItems[i].SelectedServices[j].ServiceID;
                        }

                        if (typeof ReservationItems[i].SelectedServices[j].Amount != "undefined") {
                            services.Amount = ReservationItems[i].SelectedServices[j].Amount;
                        }

                        insertReservationServiceRQ.push(services);
                    }

                    item.SelectedServices = {
                        InsertReservationServiceRQ: insertReservationServiceRQ
                    }
                }

                insertReservationItemRQ.push(item);

                this.ReservationContaItems++;
            }
        }

        return {
            InsertReservationItemRQ: insertReservationItemRQ
        };
    }

    async getAdHocReservationItems(AdhocItems) {
        let InsertReservationItemAdHocRQ = [];
        let item = {};
        let passenger = {};
        let services = {};
        let InsertReservationPassengerAdHocRQ = [];
        let InsertReservationServiceAdHocRQ = [];

        if (Array.isArray(AdhocItems)) {
            for (const i in AdhocItems) {
                item = {};
                InsertReservationItemAdHocRQ = [];
                InsertReservationPassengerAdHocRQ = [];
                item.ReservationItemOrder = this.ReservationContaItems;

                if (typeof AdhocItems[i].AdHocItemName != "undefined") {
                    item.AdHocItemName = AdhocItems[i].AdHocItemName;
                }

                if (typeof AdhocItems[i].StartDate != "undefined") {
                    item.StartDate = AdhocItems[i].StartDate;
                }

                if (typeof AdhocItems[i].EndDate != "undefined") {
                    item.EndDate = AdhocItems[i].EndDate;
                }

                if (typeof AdhocItems[i].Passengers != "undefined") {
                    for (const j in AdhocItems[i].Passengers) {
                        passenger = {};

                        if (typeof AdhocItems[i].Passengers[j].Name != "undefined") {
                            passenger.Name = AdhocItems[i].Passengers[j].Name;
                        }

                        if (typeof AdhocItems[i].Passengers[j].Surname != "undefined") {
                            passenger.Surname = AdhocItems[i].Passengers[j].Surname;
                        }

                        if (typeof AdhocItems[i].Passengers[j].DateOfBirth != "undefined") {
                            passenger.DateOfBirth = AdhocItems[i].Passengers[j].DateOfBirth;
                        }

                        InsertReservationPassengerAdHocRQ.push(passenger);
                    }

                    item.Passengers = {
                        InsertReservationPassengerAdHocRQ: InsertReservationPassengerAdHocRQ
                    };
                }

                if (typeof AdhocItems[i].SelectedServices != "undefined") {
                    for (const j in AdhocItems[i].SelectedServices) {
                        InsertReservationServiceAdHocRQ.push(AdhocItems[i].SelectedServices[j]);
                    }

                    item.SelectedServices = {
                        InsertReservationServiceAdHocRQ: InsertReservationServiceAdHocRQ
                    }
                }

                InsertReservationItemAdHocRQ.push(item);

                this.ReservationContaItems++;
            }
        }

        return {
            InsertReservationItemAdHocRQ: InsertReservationItemAdHocRQ
        };
    }

    async getReservationCustomFields(ReservationCustomFields) {

        let insertReservationCustomFieldRQ = [];

        if (Array.isArray(ReservationCustomFields)) {
            for (const i in ReservationCustomFields) {
                insertReservationCustomFieldRQ.push(ReservationCustomFields[i]);
            }
        }

        return {
            InsertReservationCustomFieldRQ: insertReservationCustomFieldRQ
        }
    }

    InsertReservation() {

        return new Promise(async (resolve, reject) => {
            let params = {};

            if (this.ExecuteInsert) {
                params.ExecuteInsert = this.ExecuteInsert;
            } else {
                params.ExecuteInsert = false;
            }

            if (this.PaymentMethodID) {
                params.PaymentMethodID = this.PaymentMethodID;
            }

            if (this.CurrencyID) {
                params.CurrencyID = this.CurrencyID;
            }

            if (this.LanguageID) {
                params.LanguageID = this.LanguageID;
            }

            if (this.CustomerObject) {
                params.Customer = this.CustomerObject;
            } else {
                if (this.Customer) {
                    params.Customer = await this.getCustumer(this.Customer, this.CustomerType);
                }
            }

            if (this.ReservationItems) {
                params.ReservationItems = await this.getReservationItems(this.ReservationItems);
            }

            if (this.ReservationCustomFields) {
                params.ReservationCustomFields = await this.getReservationCustomFields(this.ReservationCustomFields);
            }

            if (this.AdHocReservationItems) {
                params.AdHocReservationItems = await this.getAdHocReservationItems(this.AdHocReservationItems);
            }

            if (this.BranchOfficeGUID) {
                params.BranchOfficeGUID = this.BranchOfficeGUID;
            }

            let args = {
                insertReservationRequest: params
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
                    client.InsertReservation(args, (err, result) => {
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