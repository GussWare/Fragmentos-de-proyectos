import FastestValidator from "fastest-validator";
import TripadvisorInterface from "../interface/tripadvisorInterface";

exports.check = async (req, res, next) => {
	const params = req.body;
	const schema = {
		requestType: { type: "string" },
		data: {
			type: "object",
			props: {
				ApiKey: { type: "string" },
				ResellerId: { type: "string" },
				SupplierId: { type: "string" },
				ExternalReference: { type: "string", optional: true },
				Timestamp: { type: "string" },
				Extension: { type: "object", optional: true },
				Parameter: { type: "object", optional: true },
			},
		},
	};

	const validator = new FastestValidator();
	const check = validator.compile(schema);
	const valid = check({
		requestType: params.requestType,
		data: params.data,
	});

	let Response = await TripadvisorInterface.getErrorResponseInterface();

	if (Array.isArray(valid)) {
		Response.data.RequestStatus.Status =
			global.constants.AVIATOR_REQUEST_STATUS_ERROR;
		return res
			.status(global.constants.STATUS_500_INTERNAL_SERVER_ERROR)
			.send(Response);
	}

	if (
		params.data.SupplierId.trim() != global.constants.AVIATOR_SUPPLIER_ID ||
		params.data.ApiKey.trim() != global.constants.AVIATOR_API_KEY
	) {
		Response.data.RequestStatus.Status =
			global.constants.AVIATOR_REQUEST_STATUS_ERROR;
		return res
			.status(global.constants.STATUS_500_INTERNAL_SERVER_ERROR)
			.send(Response);
	}

	next();
};
