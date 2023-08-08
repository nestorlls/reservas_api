let _userService = null;

class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async update(req, res) {
    const { userId } = req.params;
    const { username, email } = req.body;

    const userUpdated = await _userService.update(userId, { username, email });
    return res.send(userUpdated);
  }

  async delete(req, res) {
    const { userId } = req.params;
    const userDeleted = await _userService.delete(userId);
    return res.send(userDeleted);
  }

  async getAll(req, res) {
    const users = await _userService.getAll();
    return res.send(users);
  }

  async getById(req, res) {
    const { userId } = req.params;
    const user = await _userService.getById(userId);
    return res.send(user);
  }
}

module.exports = UserController;
