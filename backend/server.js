const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const villaRoutes = require('./routes/villaRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // Add th
const { generalLimiter, bookingLimiter } = require('./middleware/rateLimiter');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,               // Allows cookies to be sent
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // Allows your app to "see" the auth cookies

 // Essential for guest checkout data
app.use(generalLimiter);
app.use('/api/villas', villaRoutes);
app.use('/api/bookings', bookingLimiter, bookingRoutes);
app.use('/api/admin', adminRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Export environment variables (optional, usually not needed as process.env is global)

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT},`));