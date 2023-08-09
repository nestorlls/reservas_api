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

    return userFound;
  }

  async updateUser(userId, user) {
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

    return await _userRepository.update(userId, user);
  }

  async deleteUser(userId) {
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
}

module.exports = UserService;
