const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  villa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Villa',
    required: true
  },
  guestName: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true
  },
  checkIn: { 
    type: Date, 
    required: true 
  },
  checkOut: { 
    type: Date, 
    required: true 
  },
  guests: { 
    type: Number, 
    required: true,
    default: 1 
  },
  totalPrice: { 
    type: Number, 
    required: true 
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  specialRequests: {
    type: String,
    maxLength: 500
  }
}, { timestamps: true });

// Basic validation to ensure check-out isn't before check-in
bookingSchema.pre('validate', function(next) {
  if (this.checkIn >= this.checkOut) {
    this.invalidate('checkOut', 'Check-out date must be after check-in date');
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);