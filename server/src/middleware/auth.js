const jwt = require('jsonwebtoken');

// Middleware for token authentication
const authenticateToken = (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your-secret-key' with your actual secret key

    // Pass the decoded payload to subsequent middleware or routes
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token.');
  }
};
module.exports = authenticateToken;

