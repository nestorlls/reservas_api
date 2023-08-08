const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');

module.exports = ({ BookController }) => {
  const router = Router();

  router.get('/', BookController.getAll);
  router.get('/:bookId', BookController.getById);
  router.post('/', AuthMiddleware, BookController.create);
  router.put('/:bookId', AuthMiddleware, BookController.update);
  router.delete('/:bookId', AuthMiddleware, BookController.delete);

  return router;
};
