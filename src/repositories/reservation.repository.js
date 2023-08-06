const BaseRepository = require('./base.repository');

let _reservation = null;

class ReservationRepository extends BaseRepository {
  constructor({ Reservation }) {
    super(Reservation);
    _reservation = Reservation;
  }
}

module.exports = ReservationRepository;
