const BaseService = require('./base.service');
const { isValidObjectId } = require('mongoose');

let _reservationRepository = null;
let _userRepository = null;
let _bookRepository = null;

class ReservationService extends BaseService {
  constructor({ ReservationRepository, BookRepository, UserRepository }) {
    super(ReservationRepository);
    _reservationRepository = ReservationRepository;
    _userRepository = UserRepository;
    _bookRepository = BookRepository;
  }

  async createReservation(reservation) {
    const { user, book, date_reserved, date_due } = reservation;

    // Validates
    this.isValidId({
      id: book,
      message: 'Invalid Book or Book is required',
    });
    this.isValidId({ id: user, message: 'Invalid User or User is required' });
    this.isValidValue({
      value: date_reserved,
      message: 'Date reserved is required',
    });
    this.isValidValue({ value: date_due, message: 'Date due is required' });

    if (new Date(date_reserved) < new Date()) {
      const error = new Error();
      error.status = 400;
      error.message = 'Date reserved must be greater than current date';
      return error;
    }

    if (new Date(date_due) <= new Date(date_reserved)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Date due must be greater than date reserved';
      return error;
    }

    const userExist = await _userRepository.getById(user);
    const bookExist = await _bookRepository.getById(book);

    this.isValidValue({ value: userExist, message: 'User does not exist' });
    this.isValidValue({ value: bookExist, message: 'Book does not exist' });
    this.isValidValue({
      value: bookExist.available,
      message: 'Book is reserved already',
    });

    const reservationCreated = await _reservationRepository.create({
      user: userExist?._id,
      book: bookExist?._id,
      date_reserved: date_reserved,
      date_due: date_due,
    });

    if (reservationCreated) {
      await _bookRepository.update(bookExist._id, {
        available: false,
      });
    }

    return reservationCreated;
  }

  async updateReservation(reservationId, reservation) {
    const { date_reserved, date_due } = reservation;

    // validates
    this.isValidId({
      id: reservationId,
      message: 'Invalid id or Reservation id is required',
    });

    const reservationFound = await _reservationRepository.getById(
      reservationId
    );

    this.isValidValue({
      value: reservationFound,
      message: 'Reservation does not exist',
    });

    if (new Date(date_reserved) < new Date()) {
      const error = new Error();
      error.status = 400;
      error.message = 'Date reserved must be greater than date now';
      return error;
    }

    if (new Date(date_due) <= new Date(date_reserved)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Date due must be greater than date reserved';
      return error;
    }

    return await _reservationRepository.update(reservationId, reservation);
  }

  async getReservationById(reservationId) {
    this.isValidId({
      id: reservationId,
      message: 'Invalid id or Reservation id is required',
    });

    const reservationFound = await _reservationRepository.getById(
      reservationId
    );

    this.isValidValue({
      value: reservationFound,
      message: 'Reservation does not exist',
    });

    return reservationFound;
  }

  async deleteReservation(reservationId) {
    this.isValidId({
      id: reservationId,
      message: 'Invalid id or Reservation id is required',
    });

    const reservation = await _reservationRepository.getById(reservationId);

    this.isValidValue({
      value: reservation,
      message: 'Reservation does not exist',
    });

    const isReservationDeleted = await _reservationRepository.delete(
      reservationId
    );

    if (isReservationDeleted) {
      await _bookRepository.update(reservation.book, {
        available: true,
      });
    }

    return isReservationDeleted;
  }

  async getUserReservations(userId) {
    this.isValidId({
      id: userId,
      message: 'Invalid id or User id is required',
    });

    const userFound = await _userRepository.getById(userId);

    this.isValidValue({
      value: userFound,
      message: 'User does not exist',
    });

    return await _reservationRepository.getUserReservations(userId);
  }

  async getBookReservation(bookId) {
    this.isValidId({
      id: bookId,
      message: 'Invalid id or Book id is required',
    });

    const bookFound = await _bookRepository.getById(bookId);

    this.isValidValue({ value: bookFound, message: 'Book does not exist' });

    return await _reservationRepository.getBookReservation(bookId);
  }

  isValidId({ id, message }) {
    if (!isValidObjectId(id)) {
      const error = new Error();
      error.status = 400;
      error.message = message;
      throw error;
    }
  }

  isValidValue({ value, message }) {
    if (!value) {
      const error = new Error();
      error.status = 400;
      error.message = message;
      throw error;
    }
  }
}

module.exports = ReservationService;
