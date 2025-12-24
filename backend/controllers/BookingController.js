const Booking = require('../models/BookingModel');

const createBooking = async (req, res) => {
  const { villaId, guestName, checkIn, checkOut, guests } = req.body;

  try {
    // Double-check availability (Method A logic)
    const overlap = await Booking.findOne({
      villa: villaId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } }
      ]
    });

    if (overlap) {
      return res.status(400).json({ error: "Sorry, these dates were just taken!" });
    }

    const booking = await Booking.create({
      villa: villaId,
      guestName,
      checkIn,
      checkOut,
      guests,
      status: 'pending'
    });

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createBooking };