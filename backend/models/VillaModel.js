const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const villaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true // Prevents duplicate villa names
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  image: {
    type: String, 
    required: true // We will store the URL path here (e.g., "/images/villa1.jpg")
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
});

module.exports = mongoose.model('Villa', villaSchema);