const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports.generateToken = (user) => {
  return sign({ user }, JWT_SECRET, {
    expiresIn: '1h',
  });
};
