const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Capital 'A'
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Unauthorized, JWT token is required" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store decoded user data in req.user
        next();
    } catch (err) {
        return res.status(403).json({ message: "Unauthorized, JWT expired or wrong" });
    }
};

module.exports = ensureAuthenticated;
