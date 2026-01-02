const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    // 1. Get the token from the secure cookie
    const { token } = req.cookies;

    // 2. If no token, block access immediately
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Not Authorized. Please login again." 
        });
    }

    try {
        // 3. Verify if the token is real and hasn't expired
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach the user ID to the request for the next function to use
        if (decodedToken.id) {
            req.body.userId = decodedToken.id;
        } else {
            return res.status(401).json({ success: false, message: "Invalid Token." });
        }

        // 5. Move to the next step (e.g., the Controller)
        next();

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

module.exports = userAuth;