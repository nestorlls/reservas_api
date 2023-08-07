const BaseRepository = require('./base.repository');

let _reservation = null;

class ReservationRepository extends BaseRepository {
  constructor({ Reservation }) {
    super(Reservation);
    _reservation = Reservation;
  }

  async getUserReservations(userId) {
    return await _reservation.find({ user: userId });
  }

  async getBookReservations(bookId) {
    return await _reservation.find({ book: bookId });
  }
}

module.exports = ReservationRepository;
