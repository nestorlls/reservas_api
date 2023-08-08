const { Router } = require('express');
const { AuthMiddleware, cacheMiddleware } = require('../middlewares');
const { CACHE_TIME } = require('../helpers');

module.exports = ({ UserController }) => {
  const router = Router();

  router.get('/', cacheMiddleware(CACHE_TIME.ONE_HOUR), UserController.getAll);
  router.get('/:userId', UserController.getById);
  router.put('/:userId', AuthMiddleware, UserController.update);
  router.delete('/:userId', AuthMiddleware, UserController.delete);

  return router;
};
