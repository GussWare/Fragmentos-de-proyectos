"use strict";

import jwt from "jwt-simple";
import moment from "moment";

exports.encode = async (payload) => {
	payload.sub = payload.UserID;
	payload.iat = moment().unix();
	payload.exp = moment().add(1, "days").unix;

	return jwt.encode(payload, process.env.JWT_SECRET);
};

exports.AccountEncode = async (payload) => {
	payload.sub = payload._id;
	payload.iat = moment().unix();
	payload.exp = moment().add(30, "days").unix();

	return jwt.encode(payload, process.env.JWT_SECRET);
};
