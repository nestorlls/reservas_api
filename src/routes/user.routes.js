const { Router } = require('express');

module.exports = ({ UserController }) => {
  const router = Router();

  router.get('/', UserController.getAll);
  router.get('/:userId', UserController.getById);
  router.put('/:userId', UserController.update);
  router.delete('/:userId', UserController.delete);

  return router;
};
