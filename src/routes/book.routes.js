const { Router } = require('express');

module.exports = ({ BookController }) => {
  const router = Router();

  router.get('/', BookController.getAll);
  router.get('/:bookId', BookController.getById);
  router.post('/', BookController.create);
  router.put('/:bookId', BookController.update);
  router.delete('/:bookId', BookController.delete);

  return router;
};
