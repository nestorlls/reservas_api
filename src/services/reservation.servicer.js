const BaseService = require('./base.service');

let _reservationRepository = null;
let _userRepository = null;
let _bookRepository = null;

class ReservationService extends BaseService {
  constructor({ ReservationRepository, BookResository, UserRepository }) {
    super(ReservationRepository);
    _reservationRepository = ReservationRepository;
    _userRepository = UserRepository;
    _bookRepository = BookResository;
  }

  async createReservation(userId, bookId, reservation) {
    if (!userId || !bookId) {
      throw new Error({
        status: 400,
        message: 'userId and bookId are required',
      });
    }

    const user = await _userRepository.getById(userId);
    const book = await _bookRepository.getById(bookId);

    if (!user || !book) {
      throw new Error({ status: 404, message: 'user or book not found' });
    }

    return await _reservationRepository.create({
      user: userId,
      book: bookId,
      ...reservation,
    });
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

module.exports = ReservationService;
