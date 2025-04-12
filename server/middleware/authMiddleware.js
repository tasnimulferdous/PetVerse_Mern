const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  
  // Check if auth header exists and has the right format
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user from token
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      
      // Set user in request object
      req.user = {
        id: user._id,
        username: user.username,
        email: user.email
      };
      
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If no token but the route is optional
    if (req.optionalAuth) {
      next();
      return;
    }
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware for routes where auth is optional
exports.optionalAuth = async (req, res, next) => {
  req.optionalAuth = true;
  
  let token;
  
  // Check if auth header exists and has the right format
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user from token
      const user = await User.findById(decoded.id).select('-password');
      
      if (user) {
        // Set user in request object
        req.user = {
          id: user._id,
          username: user.username,
          email: user.email
        };
      }
    } catch (error) {
      // Just continue without setting req.user
      console.error('Optional auth error:', error);
    }
  }
  
  next();
};
