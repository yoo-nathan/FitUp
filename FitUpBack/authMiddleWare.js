const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // biome-ignore lint/complexity/useOptionalChain: <explanation>
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).send('token is empty!');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification error:", err);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send('Token is expired'); 
      } else {
        return res.status(403).send('Token is invalid'); 
      }
    }
    
    req.userId = user.id;
    next();
  });
};

module.exports = authenticateToken;
