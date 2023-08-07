const BaseService = require('./base.service');

let _reservationRepository = null;

class ReservationService extends BaseService {
  constructor({ ReservationRepository }) {
    super(ReservationRepository);
    _reservationRepository = ReservationRepository;
  }

  async getUserReservations(userId) {
    if (!userId) {
      throw new Error({ status: 400, message: 'userId is required' });
    }
    return await _reservationRepository.getUserReservations(userId);
  }

  async getBookReservations(bookId) {
    if (!bookId) {
      throw new Error({ status: 400, message: 'bookId is required' });
    }
    return await _reservationRepository.getBookReservations(bookId);
  }
}
