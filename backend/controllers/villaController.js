const Villa = require('../models/VillaModel');
const Booking = require('../models/BookingModel');

// Get all villas
const getVillas = async (req, res) => {
  try {
    const villas = await Villa.find({}).sort({ createdAt: -1 });
    res.status(200).json(villas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single villa
const getVilla = async (req, res) => {
  const { id } = req.params;
  try {
    const villa = await Villa.findById(id);
    if (!villa) {
      return res.status(404).json({ error: 'No such villa' });
    }
    res.status(200).json(villa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAvailability = async (req, res) => {
  const { villaId } = req.params;

  try {
    // Find all active bookings for this villa
    const bookings = await Booking.find({
      villa: villaId,
      status: { $in: ['pending', 'confirmed'] }
    });

    let blockedDates = [];

    bookings.forEach(booking => {
      let current = new Date(booking.checkIn);
      const end = new Date(booking.checkOut);

      // Loop through the range and add each date to the array
      while (current < end) {
        blockedDates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
      }
    });

    res.status(200).json({ blockedDates });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getVillas,
  getVilla,
  getAvailability
};