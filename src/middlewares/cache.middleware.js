const mcache = require('memory-cache');
const { CACHE_KEY } = require('../config');

module.exports = (duration) => {
  return (req, res, next) => {
    const key = CACHE_KEY + req.originalUrl || req.url;
    const cachedResponse = mcache.get(key);

    if (cachedResponse) {
      return res.send(JSON.parse(cachedResponse));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};
