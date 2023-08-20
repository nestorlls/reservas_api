const { JwtHelper } = require('../helpers');

let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async signup(user) {
    const { username } = user;

    const userExists = await _userService.getByUsername(username);

    if (userExists) {
      const error = new Error();
      error.status = 401;
      error.message = 'User already exists';
      return error;
    }

    return await _userService.create(user);
  }

  async signin(user) {
    const { username, password } = user;

    const userExists = await _userService.getByUsername(username);

    this.isValidValue({ value: userExists, message: 'User does not exist' });

    const isPasswordCorrect = await userExists.comparePassword(password);

    this.isValidValue({
      value: isPasswordCorrect,
      status: 401,
      message: 'Invalid password',
    });

    const userToEncode = {
      id: userExists.id,
      username: userExists.username,
      email: userExists.email,
    };

    const token = JwtHelper.generateToken(userToEncode);

    return {
      token,
      user: userToEncode,
    };
  }

  isValidValue({ value, status, message }) {
    if (!value) {
      const error = new Error();
      error.status = status;
      error.message = message;
      throw error;
    }
  }
}

module.exports = AuthService;
