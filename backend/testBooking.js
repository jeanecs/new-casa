const mongoose = require('mongoose');
const Booking = require('./models/BookingModel');
const Villa = require('./models/VillaModel');
require('dotenv').config();

const testBooking = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  // 1. Find Villa Luna
  const villa = await Villa.findOne({ name: "Villa Luna" });

  if (villa) {
    // 2. Create a booking for specific dates (e.g., Dec 28 to Dec 30)
    await Booking.create({
      villa: villa._id,
      guestName: "Test Guest",
      checkIn: "2025-12-28", 
      checkOut: "2025-12-30",
      status: 'pending' // This should trigger the "Blocked" logic
    });
    console.log("Test booking created for Villa Luna!");
  }
  mongoose.connection.close();
};

testBooking();