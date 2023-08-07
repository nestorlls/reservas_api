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

    if (!userExists) {
      const error = new Error();
      error.status = 401;
      error.message = 'User does not exist';
      return error;
    }

    const isPasswordCorrect = await userExists.comparePassword(password);

    if (!isPasswordCorrect) {
      const error = new Error();
      error.status = 401;
      error.message = 'Invalid credentials';
      return error;
    }

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
}

module.exports = AuthService;
