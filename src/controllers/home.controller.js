let _homeController = null;

class HemeController {
  constructor({ HomeService }) {
    _homeController = HomeService;
  }

  index(req, res) {
    return res.send(_homeController.index());
  }
}

module.exports = HemeController;
