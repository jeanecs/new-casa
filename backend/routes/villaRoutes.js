const express = require('express');
const { getVillas, getVilla } = require('../controllers/villaController');

const router = express.Router();

// GET all villas
router.get('/', getVillas);

// GET a single villa
router.get('/:id', getVilla);

module.exports = router;