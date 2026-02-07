const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Book Appointment
router.post('/', async (req, res) => {
    try {
        const { patientId, doctorId, date, timeSlot } = req.body;

        console.log('📝 Booking Request:', { patientId, doctorId, date, timeSlot });

        // Validate required fields
        if (!patientId || !doctorId || !date || !timeSlot) {
            console.warn('⚠️ Missing required fields:', { patientId, doctorId, date, timeSlot });
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['patientId', 'doctorId', 'date', 'timeSlot'],
                received: { patientId, doctorId, date, timeSlot }
            });
        }

        // Validate if patientId and doctorId are valid MongoDB ObjectIds
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            console.warn('⚠️ Invalid patientId format:', patientId);
            return res.status(400).json({ error: 'Invalid patient ID format' });
        }
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            console.warn('⚠️ Invalid doctorId format:', doctorId);
            return res.status(400).json({ error: 'Invalid doctor ID format' });
        }

        const newAppt = new Appointment({
            patientId,
            doctorId,
            date,
            timeSlot,
            status: 'Pending',
            paymentStatus: 'Pending'
        });

        await newAppt.save();

        console.log('✅ Appointment created:', newAppt._id);

        // Populate for response
        const populatedAppt = await Appointment.findById(newAppt._id)
            .populate('patientId', 'name email')
            .populate({
                path: 'doctorId',
                populate: { path: 'userId', select: 'name email' }
            });

        res.status(201).json(populatedAppt);
    } catch (err) {
        console.error('❌ Error creating appointment:', err.message);
        console.error('Stack:', err.stack);
        res.status(500).json({ 
            error: err.message,
            details: err.errors ? Object.keys(err.errors).map(key => err.errors[key].message) : 'Unknown error'
        });
    }
});

// Get Appointments (With filters)
router.get('/', async (req, res) => {
    try {
        const { userId, role, doctorId } = req.query;
        let query = {};

        // Build query based on role
        if (role === 'patient' && userId) {
            query.patientId = userId;
        }
        if (role === 'doctor' && (userId || doctorId)) {
            // If doctor role, find appointments for this doctor
            query.doctorId = doctorId || userId;
        }
        // If admin, return all (no filter)

        console.log('Fetching appointments with query:', query);

        const appointments = await Appointment.find(query)
            .populate('patientId', 'name email phone')
            .populate({
                path: 'doctorId',
                populate: { path: 'userId', select: 'name email' }
            })
            .sort({ date: -1, createdAt: -1 });

        console.log(`Found ${appointments.length} appointments`);
        res.json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: err.message });
    }
});

// Update Status (e.g. Cancel, Confirm)
router.put('/:id', async (req, res) => {
    try {
        const { status, paymentStatus, diagnosis, prescription } = req.body;

        const updateData = {};
        if (status) updateData.status = status;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;
        if (diagnosis) updateData.diagnosis = diagnosis;
        if (prescription) updateData.prescription = prescription;

        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        )
            .populate('patientId', 'name email')
            .populate({
                path: 'doctorId',
                populate: { path: 'userId', select: 'name email' }
            });

        if (!updated) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json(updated);
    } catch (err) {
        console.error('Error updating appointment:', err);
        res.status(500).json({ error: err.message });
    }
});

// Delete appointment (optional - for admin)
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Appointment.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error('Error deleting appointment:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
