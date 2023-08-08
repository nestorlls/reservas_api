const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');

const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');
module.exports = function ({
  HomeRoutes,
  UserRoutes,
  AuthRoutes,
  BookRoutes,
  ReservationRoutes,
}) {
  const router = express.Router();
  const apiRoutes = express.Router();
  const swaggerUI = require('swagger-ui-express');
  const { SWAGGER_PATH } = require('../config');
  const swaggerDocument = require(SWAGGER_PATH);

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
  router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
