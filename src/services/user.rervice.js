const BaseService = require('./base.service');
const { isValidObjectId } = require('mongoose');

let _userRepository = null;
let _reservationService = null;

class UserService extends BaseService {
  constructor({ UserRepository, ReservationService }) {
    super(UserRepository);
    _userRepository = UserRepository;
    _reservationService = ReservationService;
  }

  async getById(userId) {
    this.isValidId({ id: userId, message: 'invalid Id or Id is required' });

    const userFound = await _userRepository.getById(userId);

    this.isValidValue({ value: userFound, message: 'User does not exist' });

    return userFound;
  }

  async updateUser(userId, user) {
    this.isValidId({
      id: userId,
      message: 'Invalid id  or Id is required',
    });

    const userFound = await _userRepository.getById(userId);

    this.isValidValue({ value: userFound, message: 'User does not exist' });

    return await _userRepository.update(userId, user);
  }

  async deleteUser(userId) {
    this.isValidId({
      id: userId,
      message: 'Invalid id or User id is required',
    });

    const userFound = await _userRepository.getById(userId);

    this.isValidValue({ value: userFound, message: 'User does not exist' });

    const userReservationFound = await _reservationService.getUserReservations(
      userId
    );

    if (userReservationFound.length >= 1) {
      for (const reservation of userReservationFound) {
        if (isValidObjectId(reservation._id)) {
          await _reservationService.deleteReservation(reservation._id);
        }
      }
    }

    return await _userRepository.delete(userId);
  }

  async getByUsername(username) {
    return await _userRepository.getByUsername(username);
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

module.exports = UserService;
