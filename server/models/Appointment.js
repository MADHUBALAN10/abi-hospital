const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'ongoing', 'completed', 'cancelled', 'Pending', 'Confirmed', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'completed', 'Pending', 'Paid', 'Completed'],
        default: 'Pending'
    },
    paymentAmount: { type: Number, default: 0 },
    paymentId: { type: String },
    diagnosis: { type: String },
    prescription: { type: String },
    notes: { type: String }
}, {
    timestamps: true
});

// Index for faster queries
appointmentSchema.index({ patientId: 1, date: -1 });
appointmentSchema.index({ doctorId: 1, date: -1 });
appointmentSchema.index({ status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
