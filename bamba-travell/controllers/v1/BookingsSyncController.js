import express from "express";
import BookingSyncBamba from "../../services/bamba/BookingSyncBamba";
import BookingModel from "../../models/BookingModel";
import LangMiddelWare from "../../middelwares/language";
import FastestValidator from "fastest-validator";

const router = express.Router();

router.post(
	"/v1/sync-bookings-by-id",
	[LangMiddelWare.load],
	async (req, res) => {
		try {
			let params = req.body;
			let bookingResponse = null;

			if (params.Remplace) {
				const bookingBamba = new BookingSyncBamba();
				bookingResponse = await bookingBamba.syncBookingByReservationID(
					params.ReservationID
				);
			} else {
				bookingResponse = await BookingModel.findOne({
					BambaReservationID: params.ReservationID,
				});
			}

			res.status(global.constants.STATUS_200_OK).send(bookingResponse);
		} catch (error) {
			console.log(error);
			res.status(global.constants.STATUS_500_INTERNAL_SERVER_ERROR).send([
				{
					message: error,
				},
			]);
		}
	}
);

router.post(
	"/v1/sync-bookings-by-bamba-reservation-id",
	[LangMiddelWare.load],
	async (req, res) => {
		try {
			let params = req.body;
			let bookingResponse = null;

			const schema = {
				BambaReservationID: { type: "string" },
			};

			const validator = new FastestValidator();
			const check = validator.compile(schema);
			const valid = check({
				BambaReservationID: params.BambaReservationID,
			});

			if (Array.isArray(valid)) {
				return res
					.status(global.constants.STATUS_500_INTERNAL_SERVER_ERROR)
					.send(valid);
			}

			const bookingBamba = new BookingSyncBamba();
			bookingResponse = await bookingBamba.syncBookingByBambaReservationID(
				params.BambaReservationID
			);

			return res.status(global.constants.STATUS_200_OK).send(bookingResponse);
		} catch (error) {
			console.log(error);
			res.status(global.constants.STATUS_500_INTERNAL_SERVER_ERROR).send([
				{
					message: error.message,
				},
			]);
		}
	}
);

module.exports = router;
