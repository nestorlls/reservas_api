const { Router } = require('express');
const { AuthMiddleware, cacheMiddleware } = require('../middlewares');
const { CACHE_TIME } = require('../helpers');

module.exports = ({ BookController }) => {
  const router = Router();

  router.get('/', cacheMiddleware(CACHE_TIME.ONE_HOUR), BookController.getAll);
  router.get(
    '/:bookId',
    cacheMiddleware(CACHE_TIME.ONE_HOUR),
    BookController.getById
  );
  router.post('/', AuthMiddleware, BookController.create);
  router.put('/:bookId', AuthMiddleware, BookController.update);
  router.delete('/:bookId', AuthMiddleware, BookController.delete);

  return router;
};
