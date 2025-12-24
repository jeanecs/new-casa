const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  villa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Villa',
    required: true
  },
  guestName: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);