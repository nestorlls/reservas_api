const { Router } = require('express');
const { cacheMiddleware } = require('../middlewares');
const { CACHE_TIME } = require('../helpers');

module.exports = ({ BookController }) => {
  const router = Router();

  router.get('/', cacheMiddleware(CACHE_TIME.ONE_HOUR), BookController.getAll);
  router.get(
    '/:bookId',
    cacheMiddleware(CACHE_TIME.ONE_HOUR),
    BookController.getById
  );
  router.post('/', BookController.create);
  router.put('/:bookId', BookController.update);
  router.delete('/:bookId', BookController.delete);

  return router;
};
