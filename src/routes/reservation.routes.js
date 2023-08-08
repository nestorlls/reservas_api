const { Router } = require('express');
const { AuthMiddleware, cacheMiddleware } = require('../middlewares');
const { CACHE_TIME } = require('../helpers');

module.exports = ({ ReservationController }) => {
  const router = Router();

  router.get(
    '/',
    cacheMiddleware(CACHE_TIME.ONE_HOUR),
    ReservationController.getAllReservations
  );
  router.get(
    '/:reservationId',
    cacheMiddleware(CACHE_TIME.ONE_HOUR),
    ReservationController.getReservationById
  );
  router.get(
    '/:userId/all',
    cacheMiddleware(CACHE_TIME.ONE_HOUR),
    ReservationController.getUserReservations
  );
  router.get(
    '/book/:bookId',
    cacheMiddleware(CACHE_TIME.ONE_HOUR),
    ReservationController.getBookReservation
  );
  router.post('/', AuthMiddleware, ReservationController.createReservation);
  router.put(
    '/:reservationId',
    AuthMiddleware,
    ReservationController.updateReservation
  );
  router.delete(
    '/:reservationId',
    AuthMiddleware,
    ReservationController.deleteReservation
  );

  return router;
};
