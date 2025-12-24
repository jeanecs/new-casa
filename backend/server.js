const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const villaRoutes = require('./routes/villaRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Essential for guest checkout data
app.use('/api/villas', villaRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});     

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Export environment variables (optional, usually not needed as process.env is global)

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT},`));