import InsertTransactionForReservationBamba from "./InsertTransactionForReservationBamba";

export default class BookingInsertTransactionForReservationBamba {
	constructor() {
		this.InsertTransactionForReservationBamba = new InsertTransactionForReservationBamba();
	}

	async insertTransactionForReservation(
		ReservationID,
		AmountCalculatePrice,
		PaymentMethodID,
		PaymentID
	) {
		let transactionTime = new Date();

		try {
			await this.InsertTransactionForReservationBamba.InsertTransactionForReservation(
				{
					ReservationID: ReservationID,
					TransactionAmount: AmountCalculatePrice,
					CurrencyID: global.constants.DEFAULT_CURRENCY_ID,
					TransactionTime:
						transactionTime.getFullYear() +
						1 +
						"-" +
						(transactionTime.getMonth() + 1 <= 9
							? "0" + (transactionTime.getMonth() + 1)
							: transactionTime.getMonth() + 1) +
						"-" +
						(transactionTime.getDate() <= 9
							? "0" + transactionTime.getDate()
							: transactionTime.getDate() + ""),
					PaymentMethodID: PaymentMethodID,
					TransactionReferenceNumber: PaymentID,
				}
			);
		} catch (error) {}
	}
}
