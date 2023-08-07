const { createContainer, asClass, asValue, asFunction } = require('awilix');

// config
const config = require('../config');
const app = require('.');

// services
const {
  HomeService,
  UserService,
  BookService,
  ReservationService,
} = require('../services');

// controllers
const { HomeController } = require('../controllers');

// routes
const { HomeRoutes } = require('../routes/index.routes');
const Routes = require('../routes');

// models
const { User, Book, Reservation } = require('../models');

// repositories
const {
  UserRepository,
  BookRepository,
  ReservationRepository,
} = require('../repositories');

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    BookService: asClass(BookService).singleton(),
    ReservationService: asClass(ReservationService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
  })
  .register({
    User: asValue(User),
    Book: asValue(Book),
    Reservation: asValue(Reservation),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    BookRepository: asClass(BookRepository).singleton(),
    ReservationRepository: asClass(ReservationRepository).singleton(),
  });

module.exports = container;
