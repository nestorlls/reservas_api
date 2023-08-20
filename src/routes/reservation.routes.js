const { Router } = require('express');
const { cacheMiddleware } = require('../middlewares');
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
  router.post('/', ReservationController.createReservation);
  router.put('/:reservationId', ReservationController.updateReservation);
  router.delete('/:reservationId', ReservationController.deleteReservation);

  return router;
};
