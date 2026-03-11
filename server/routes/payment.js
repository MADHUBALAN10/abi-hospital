const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount, doctorName, successUrl, cancelUrl, appointmentId } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        console.log('💳 Creating Checkout Session:', { amount, doctorName });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Consultation with ${doctorName}`,
                        },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            client_reference_id: appointmentId,
        });

        console.log('✅ Checkout Session created:', session.url);

        res.json({
            url: session.url
        });
    } catch (err) {
        console.error('❌ Stripe Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Verify Payment by reading the checkout session
router.get('/verify-session/:sessionId', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
        res.json({
            paymentStatus: session.payment_status,
            amount: session.amount_total / 100,
            appointmentId: session.client_reference_id,
        });
    } catch (err) {
        console.error('❌ Payment verification error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

router.put('/update-appointment-payment/:id', async (req, res) => {
    try {
        const Appointment = require('../models/Appointment');
        const { paymentStatus } = req.body;
        const appt = await Appointment.findByIdAndUpdate(req.params.id, { paymentStatus }, { new: true });
        res.json(appt);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
