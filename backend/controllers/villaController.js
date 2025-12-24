const Villa = require('../models/VillaModel');

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

module.exports = {
  getVillas,
  getVilla
};