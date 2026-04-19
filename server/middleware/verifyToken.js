const jwt = require('jsonwebtoken');

/**
 * @desc    Middleware that verifies the JWT token sent with a request
 *          1. Check if a token exists in the Authorization header
 *          2. Verify the token is valid using our JWT secret
 *          3. Extract the user ID from the token and attach it to the request
 *          4. Call next() to move on to the actual route
 * @access  Used on all protected routes
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Auth header:', authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token, access denied!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    console.log('Setting userId to:', decoded.id);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    res.status(401).json({ message: 'Invalid token!' });
  }
};

module.exports = verifyToken;