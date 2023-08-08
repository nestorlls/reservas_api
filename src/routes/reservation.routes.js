const { Router } = require('express');

module.exports = ({ ReservationController }) => {
  const router = Router();

  router.get('/', ReservationController.getReservations);
  router.get('/:reservationId', ReservationController.getReservationById);
  router.get('/:userId/all', ReservationController.getUserReservations);
  router.get('/book/:bookId', ReservationController.getBookReservation);
  router.post('/', ReservationController.createReservation);
  router.put('/:reservationId', ReservationController.updateReservation);
  router.delete('/:reservationId', ReservationController.deleteReservation);

  return router;
};
