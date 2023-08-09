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

    if (!user || !book) {
      const error = new Error();
      error.status = 400;
      error.message = 'User or book is required';
      return error;
    }

    if (!date_reserved || !date_due) {
      const error = new Error();
      error.status = 400;
      error.message = 'Date reserved or date due is required';
      return error;
    }

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

    const userExist = await _userRepository.getById(user);
    const bookExist = await _bookRepository.getById(book);

    if (!userExist || !bookExist) {
      const error = new Error();
      error.status = 400;
      error.message = 'User or book does not exist';
      return error;
    }

    if (!bookExist?.available) {
      const error = new Error();
      error.status = 400;
      error.message = 'Book is reserved already';
      return error;
    }

    const res = await _reservationRepository.create({
      user: userExist?._id,
      book: bookExist?._id,
      date_reserved: date_reserved,
      date_due: date_due,
    });

    if (res) {
      await _bookRepository.update(bookExist._id, {
        available: false,
      });
    }

    return res;
  }

  async updateReservation(reservationId, reservation) {
    const { date_reserved, date_due } = reservation;

    if (!isValidObjectId(reservationId)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Reservation id is required';
      return error;
    }

    const reservationFound = await _reservationRepository.getById(
      reservationId
    );

    if (!reservationFound) {
      const error = new Error();
      error.status = 400;
      error.message = 'Reservation does not exist';
      return error;
    }

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
    if (!isValidObjectId(reservationId)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Reservation id is required';
      return error;
    }

    const reservationFound = await _reservationRepository.getById(
      reservationId
    );
    if (!reservationFound) {
      const error = new Error();
      error.status = 400;
      error.message = 'Reservation does not exist';
      return error;
    }

    return reservationFound;
  }

  async deleteReservation(reservationId) {
    if (!isValidObjectId(reservationId)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Reservation id is required';
      return error;
    }

    const reservation = await _reservationRepository.getById(reservationId);

    if (!reservation) {
      const error = new Error();
      error.status = 400;
      error.message = 'Reservation does not exist';
      return error;
    }

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
    if (!isValidObjectId(userId)) {
      const error = new Error();
      error.status = 400;
      error.message = 'User id is required';
      return error;
    }

    const userFound = await _userRepository.getById(userId);
    if (!userFound) {
      const error = new Error();
      error.status = 400;
      error.message = 'User does not exist';
      return error;
    }

    return await _reservationRepository.getUserReservations(userId);
  }

  async getBookReservation(bookId) {
    if (!isValidObjectId(bookId)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Book id is required';
      return error;
    }

    const bookFound = await _bookRepository.getById(bookId);
    if (!bookFound) {
      const error = new Error();
      error.status = 400;
      error.message = 'Book does not exist';
      return error;
    }

    return await _reservationRepository.getBookReservation(bookId);
  }
}

module.exports = ReservationService;
