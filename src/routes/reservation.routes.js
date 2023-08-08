const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');

module.exports = ({ ReservationController }) => {
  const router = Router();

  router.get('/', ReservationController.getReservations);
  router.get('/:reservationId', ReservationController.getReservationById);
  router.get('/:userId/all', ReservationController.getUserReservations);
  router.get('/book/:bookId', ReservationController.getBookReservation);
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
