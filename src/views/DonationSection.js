import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLIC_STRIPE_KEY}`);

function DonationSection() {
	const handleClick = async (event) => {
		let donationAmountPicked;
		if (event.target.value === '25') {
			donationAmountPicked = 'price_1IN1GRAlKmJP4lfr3Zf1PBUC';
		} else if (event.target.value === '5') {
			donationAmountPicked = 'price_1IN1G3AlKmJP4lfrSwjaNSKC';
		}
		// When the customer clicks on the button, redirect them to Checkout.
		const stripe = await stripePromise;
		const { error } = await stripe.redirectToCheckout({
			lineItems: [
				{
					price: donationAmountPicked,
					quantity: 1,
				},
			],
			mode: 'payment',
			successUrl: 'http://localhost:3000/hillcityreact#/payment-success',
			cancelUrl: 'http://localhost:3000/hillcityreact#/payment-failed',
		});
		// If `redirectToCheckout` fails due to a browser or network
		// error, display the localized error message to your customer
		// using `error.message`.
		console.log('DONATION ERROR: ', error);
	};

	return (
		<div className='container'>
			<button
				className='btn btn-primary'
				role='link'
				onClick={handleClick}
				value='5'>
				Give $5.00
			</button>
			<button
				className='btn btn-primary'
				role='link'
				onClick={handleClick}
				value='25'>
				Give $25.00
			</button>
		</div>
	);
}

export default DonationSection;
