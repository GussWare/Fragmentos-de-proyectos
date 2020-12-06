"use strict";

exports.isInt = async (num) => {
	return num % 1 === 0;
};

exports.formatNumber = async (num, decimales = 2) => {
	let signo = num >= 0 ? 1 : -1;
	num = num * signo;

	if (decimales === 0) {
		return signo * Math.round(num);
	}

	num = num.toString().split("e");
	num = Math.round(
		+(num[0] + "e" + (num[1] ? +num[1] + decimales : decimales))
	);
	num = num.toString().split("e");

	let total =
		signo * (num[0] + "e" + (num[1] ? +num[1] - decimales : -decimales));

	if (await exports.isInt(total)) {
		total = total.toString() + ".00";
	} else {
		let totalString = "" + total;
		let totalSplit = totalString.split(".");

		if (totalSplit.length > 0) {
			let decimalString = "" + totalSplit[1];
			if (decimalString.length < 2) {
				total = totalSplit[0] + "." + decimalString + "0";
			}
		}
	}

	return total.toString();
};
