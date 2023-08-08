const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');

const { NotFoundMiddleware } = require('../middlewares');
module.exports = function ({
  HomeRoutes,
  UserRoutes,
  AuthRoutes,
  BookRoutes,
  ReservationRoutes,
}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  router.use(express.json());
  router.use(cors());
  router.use(helmet());
  router.use(compression());

  apiRoutes.use('/home', HomeRoutes);
  apiRoutes.use('/user', UserRoutes);
  apiRoutes.use('/auth', AuthRoutes);
  apiRoutes.use('/book', BookRoutes);
  apiRoutes.use('/reservation', ReservationRoutes);

  router.use('/api', apiRoutes);

  router.use(NotFoundMiddleware);

  return router;
};
