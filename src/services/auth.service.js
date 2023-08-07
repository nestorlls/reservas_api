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
      throw new Error({
        status: 409,
        message: 'User already exists',
      });
    }

    return await _userService.create(user);
  }

  async signin(user) {
    const { username, password } = user;

    const userExists = await _userService.getByUsername(username);

    if (!userExists) {
      throw new Error({
        status: 404,
        message: 'User not found',
      });
    }

    const isPasswordCorrect = userExists.comparePasswords(password);

    if (!isPasswordCorrect) {
      throw new Error({
        status: 401,
        message: 'Invalid password',
      });
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
