const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- REGISTER ADMIN ---
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        res.json({ success: true, message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- LOGIN ADMIN ---
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        // Compare the password entered with the hashed password in DB
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days and in milliseconds 
        });

        res.json({ success: true, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- LOGOUT ---
const adminLogout = async (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: "Logged out" });
};

module.exports = { registerAdmin, adminLogin, adminLogout };