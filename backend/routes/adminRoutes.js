const express = require('express');
const router = express.Router();
const { registerAdmin, adminLogin, adminLogout } = require('../controllers/AdminController');
const userAuth = require('../middleware/auth');

// Public
router.post('/register', registerAdmin); // Call this once in Postman to create yourself
router.post('/login', adminLogin);
router.post('/logout', adminLogout);

// Protected route: Only works if you have a valid cookie!
router.get('/dashboard-data', userAuth, (req, res) => {
    res.json({ success: true, message: "Welcome to the Casa Filomena Admin Data" });
});

router.post('/logout', adminLogout);

module.exports = router;