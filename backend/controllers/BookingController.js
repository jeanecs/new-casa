const Booking = require('../models/BookingModel');
const Villa = require('../models/VillaModel'); // Needed to fetch nightly rates

const createBooking = async (req, res) => {
  // Destructure the new fields from the request body
  const { villaId, guestName, email, checkIn, checkOut, guests, phoneNumber, specialRequests } = req.body;

  try {
    // 1. Fetch the Villa to get the nightly price
    const villa = await Villa.findById(villaId);
    if (!villa) {
      return res.status(404).json({ error: "Villa not found" });
    }

    // 2. Double-check availability
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

    // 3. Calculate Total Price
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * villa.price;

    // 4. Create the booking with all new schema fields
    const booking = await Booking.create({
      villa: villaId,
      guestName,
      email,
      checkIn,
      checkOut,
      guests,
      totalPrice, // Calculated on backend for security
      phoneNumber,
      specialRequests,
      status: 'pending'
    });

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    // Populate villa details and sort by newest first
    const bookings = await Booking.find({})
      .populate('villa')
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true, runValidators: true } // runValidators ensures status is within the enum
    );
    
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createBooking, getAllBookings, updateBookingStatus };