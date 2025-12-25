require('dotenv').config();
const mongoose = require('mongoose');
const Villa = require('./models/VillaModel');

const villas = [
  {
    name: "Villa Cia",
    description: "A serene getaway with modern Mediterranean architecture and a private infinity pool.",
    price: 450,
    bedrooms: 3,
    bathrooms: 2,
    image: "/casa1.jpg",
    isAvailable: true
  },
  {
    name: "Villa Sol",
    description: "Experience golden hour every day in this light-filled luxury villa overlooking the coast.",
    price: 600,
    bedrooms: 4,
    bathrooms: 3,
    image: "/casa2.jpg",
    isAvailable: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data so you don't get duplicates
    await Villa.deleteMany({});
    console.log("Old villas cleared.");

    // Insert the new villas
    await Villa.insertMany(villas);
    console.log("Database Seeded! Villa Luna and Villa Sol have been added.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDB();