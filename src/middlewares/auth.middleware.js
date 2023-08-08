const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.header('authorization');

  if (!token) {
    return res.status(401).send({ status: 401, message: 'No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ status: 401, message: 'Invalid token.' });
    }

    req.user = decoded;
    next();
  });
};
