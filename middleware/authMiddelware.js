const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.split(' ')[1]; // Extract the token after 'Bearer'

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Attach user ID to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
