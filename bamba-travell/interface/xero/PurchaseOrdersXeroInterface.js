"use strict";

exports.getPurchaseOrders = async () => {
	return {
		contact: {
			contactID: null,
		},
		reference: null,
		currencyCode: null,
		status: null,
		date: null,
		deliveryDate: null,
		lineAmountTypes: null,
		lineItems: [],
	};
};

exports.getLineItem = async () => {
	return {
		description: null,
		quantity: null,
		unitAmount: null,
	};
};
