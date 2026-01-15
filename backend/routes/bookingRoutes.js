const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, updateBookingStatus } = require('../controllers/BookingController');
const { createClient } = require('redis');
const userAuth = require('../middleware/auth');

// 1. Initialize the Redis Client
const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.connect().catch(err => console.log('Redis Connection Error', err));

// 2. The "Soft Lock" Route (The 10-minute hold)
router.post('/hold', async (req, res) => {
  const { villaId, checkIn, checkOut } = req.body;
  const lockKey = `hold:${villaId}:${checkIn}:${checkOut}`;

  try {
    // NX: Only sets if key doesn't exist
    // EX: Sets expiration to 600 seconds (10 mins)
    const acquired = await redisClient.set(lockKey, 'locked', {
      NX: true,
      EX: 600
    });

    if (!acquired) {
      return res.status(409).json({ 
        message: "These dates are temporarily held by another guest. Please try again in 10 minutes." 
      });
    }

    res.status(200).json({ message: "Dates held for 10 minutes" });
  } catch (error) {
    res.status(500).json({ error: "Server error during date hold" });
  }
});

// Allow frontend to manually cancel a hold if the user leaves checkout
router.delete('/release-hold', async (req, res) => {
    const { villaId, checkIn, checkOut } = req.body;
    const lockKey = `hold:${villaId}:${checkIn}:${checkOut}`;
    
    await redisClient.del(lockKey);
    res.status(200).json({ message: "Hold released" });
});

// 3. The Final Booking Route
router.post('/', createBooking);
router.get('/admin/all', userAuth, getAllBookings);
router.patch('/admin/update/:id', userAuth, updateBookingStatus);

module.exports = router;