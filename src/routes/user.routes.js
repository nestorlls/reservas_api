const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');

module.exports = ({ UserController }) => {
  const router = Router();

  router.get('/', UserController.getAll);
  router.get('/:userId', UserController.getById);
  router.put('/:userId', AuthMiddleware, UserController.update);
  router.delete('/:userId', AuthMiddleware, UserController.delete);

  return router;
};
