const express = require('express');
const { createBooking } = require('../controllers/BookingController');

const router = express.Router();

// POST a new booking
router.post('/', createBooking);

module.exports = router;