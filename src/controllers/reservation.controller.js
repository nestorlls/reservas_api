let _reservationService = null;

class ReservationController {
  constructor({ ReservationService }) {
    _reservationService = ReservationService;
  }

  async createReservation(req, res) {
    const { body } = req;

    const reservationCreated = await _reservationService.createReservation(
      body
    );

    return res.status(201).send(reservationCreated);
  }

  async updateReservation(req, res) {
    const { reservationId } = req.params;
    const { body } = req;
    const reservationUpdated = await _reservationService.updateReservation(
      reservationId,
      body
    );
    return res.send(reservationUpdated);
  }

  async deleteReservation(req, res) {
    const { reservationId } = req.params;
    const reservationDeleted = await _reservationService.deleteReservation(
      reservationId
    );
    return res.send(reservationDeleted);
  }

  async getReservations(req, res) {
    const reservations = await _reservationService.getAll();
    return res.send(reservations);
  }

  async getReservationById(req, res) {
    const { reservationId } = req.params;
    const reservation = await _reservationService.getReservationById(
      reservationId
    );
    return res.send(reservation);
  }

  async getUserReservations(req, res) {
    const { userId } = req.params;
    const reservations = await _reservationService.getUserReservations(userId);
    return res.send(reservations);
  }

  async getBookReservation(req, res) {
    const { bookId } = req.params;
    const reservation = await _reservationService.getBookReservation(bookId);
    return res.send(reservation);
  }
}

module.exports = ReservationController;
