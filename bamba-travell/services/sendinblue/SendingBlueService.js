import SibApiV3Sdk from 'sib-api-v3-sdk';

export default class SendinBlue {

    constructor() {

    }

    async addListClientsMinusReaders(params) {

        // paso 1 validar si el contacto existe con el metodo getContactInfo 
        var existe = await this.getContactInfo(params.Email);

        // paso 2 si no esta creado el contacto, entonces lo tenemos que crearlo
        if (!existe) {
            existe = await this.createContact(params.Name, params.Email);
        }

        // paso 3 si tenemos su id valido entonces procedemos a agregar a la lista
        if(existe) {
            existe = await this.addContactToList(global.constants.SENDING_BLUE_LIST_CLIENTS_ID, [params.Email]);
        }

        return existe;

    }

    async getContactInfo(Email) {
        var defaultClient = SibApiV3Sdk.ApiClient.instance;

        // Configure API key authorization: api-key
        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SENDING_BLUE_API_KEY;

        var api = new SibApiV3Sdk.ContactsApi();
        var existe = null;

        try {
            const response = await api.getContactInfo(Email);
            if (response.id) {
                existe = true;
            }
        } catch (error) {
            existe = false;
        }

        return existe;
    }

    async createContact(Name, Email) {
        var defaultClient = SibApiV3Sdk.ApiClient.instance;

        // Configure API key authorization: api-key
        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SENDING_BLUE_API_KEY;

        var api = new SibApiV3Sdk.ContactsApi();

        var createContact = new SibApiV3Sdk.CreateContact(); 
        createContact.email = Email;
        createContact.attributes = {
            full_name:Name,
            gdpr:true
        };

        var existe = null;

        try {
            var response = await api.createContact(createContact);
            if(response.id) {
                existe = true;
            }
        } catch (error) {
            existe = false;
        }
        
        return existe;
    }
    

    async addContactToList(ListID, ContacEmailsList) {
        var defaultClient = SibApiV3Sdk.ApiClient.instance;

        // Configure API key authorization: api-key
        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SENDING_BLUE_API_KEY;

        var api = new SibApiV3Sdk.ContactsApi();
        var existe = null;

        var contactEmails = new SibApiV3Sdk.AddContactToList();
        contactEmails.emails = ContacEmailsList;

        try {
            var response = await api.addContactToList(ListID, contactEmails);
            existe = true;
        } catch (error) {
            existe = false;
        }
        
        return existe;
    }

    async deleteContact(Email) {
        var defaultClient = SibApiV3Sdk.ApiClient.instance;

        // Configure API key authorization: api-key
        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.SENDING_BLUE_API_KEY;

        var api = new SibApiV3Sdk.ContactsApi();

        var response = await api.deleteContact(Email);

        return response;

    }
}