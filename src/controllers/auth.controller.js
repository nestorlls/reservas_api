let _authService = null;

class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async signup(req, res) {
    const { body } = req;
    const userCreated = await _authService.signup(body);
    return res.status(201).send(userCreated);
  }

  async signin(req, res) {
    const { body } = req;
    const credentials = await _authService.signin(body);
    return res.status(200).send(credentials);
  }
}

module.exports = AuthController;
