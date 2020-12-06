import Stripe from "stripe";

export default class StripeService {
	constructor() {}

	async verificarTransaccion(params) {
		const secret = process.env.STRIPE_SECRET_TOKEN;
		const stripe = new Stripe(secret);

		// se convierte en integer
		// https://stripe.com/docs/recipes/variable-amount-checkout
		let charge = await stripe.charges.create({
			amount: Math.round(parseFloat(params.amount) * 100),
			currency: params.currency,
			description: params.description,
			source: params.token,
			metadata: params.metadata,
		});

		return charge;
	}
}
