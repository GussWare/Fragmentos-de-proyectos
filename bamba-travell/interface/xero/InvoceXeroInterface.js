"use strict";

exports.getInvoice = async () => {
	return {
		type: null,
		contact: {
			contactID: null,
		},
		reference: null,
		currencyCode: null,
		status: null,
		date: null,
		dueDate: null,
		lineAmountTypes: null,
		lineItems: null,
	};
};

exports.getLineItem = async () => {
	return {
		itemCode: null,
		description: null,
		taxType: null,
		quantity: null,
		unitAmount: null,
		accountCode: null,
	};
};
