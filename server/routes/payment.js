const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
router.post('/create-order', async (req, res) => {
    const { amount, doctorName, appointmentId } = req.body;

    try {
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        console.log('💳 Creating Razorpay Order:', { amount, doctorName, appointmentId });

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // Razorpay expects paise
            currency: 'INR',
            receipt: `appt_${appointmentId}`,
            notes: {
                appointmentId: appointmentId,
                doctorName: doctorName,
                hospital: 'ABHI SK Hospital',
            },
        });

        console.log('✅ Razorpay Order created:', order.id);

        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (err) {
        console.error('❌ Razorpay Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Verify Payment Signature
router.post('/verify-payment', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;

    try {
        // Verify signature using HMAC SHA256
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        const isValid = expectedSignature === razorpay_signature;

        console.log('🔍 Payment verification:', { razorpay_order_id, razorpay_payment_id, isValid });

        if (isValid) {
            // Update appointment payment status
            if (appointmentId) {
                const Appointment = require('../models/Appointment');
                await Appointment.findByIdAndUpdate(appointmentId, {
                    paymentStatus: 'Paid',
                    paymentId: razorpay_payment_id,
                }, { new: true });
                console.log('✅ Appointment payment updated:', appointmentId);
            }

            res.json({
                success: true,
                message: 'Payment verified successfully',
                paymentId: razorpay_payment_id,
            });
        } else {
            console.error('❌ Invalid payment signature');
            res.status(400).json({
                success: false,
                error: 'Invalid payment signature',
            });
        }
    } catch (err) {
        console.error('❌ Payment verification error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Update appointment payment status (manual fallback)
router.put('/update-appointment-payment/:id', async (req, res) => {
    try {
        const Appointment = require('../models/Appointment');
        const { paymentStatus, paymentId } = req.body;

        const updateData = { paymentStatus };
        if (paymentId) updateData.paymentId = paymentId;

        const appt = await Appointment.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!appt) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        console.log('✅ Appointment payment updated:', req.params.id, '→', paymentStatus);
        res.json(appt);
    } catch (err) {
        console.error('❌ Error updating appointment payment:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
