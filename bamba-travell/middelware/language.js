"use strict";

const langHelper = require("../helpers/LanguageHelper");

exports.load = async (req, res, next) => {
	var lang = process.env.LANG_DEFAULT;

	global.lang = lang;
	global.translation = await langHelper.load(lang, process.env.LANG_PATH);

	next();
};
