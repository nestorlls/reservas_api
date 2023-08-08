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
  AuthService,
} = require('../services');

// controllers
const {
  HomeController,
  UserController,
  BookController,
  ReservationController,
  AuthController,
} = require('../controllers');

// routes
const {
  HomeRoutes,
  UserRoutes,
  AuthRoutes,
  BookRoutes,
  ReservationRoutes,
} = require('../routes/index.routes');
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
    AuthService: asClass(AuthService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    BookController: asClass(BookController.bind(BookController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    ReservationController: asClass(
      ReservationController.bind(ReservationController)
    ).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    BookRoutes: asFunction(BookRoutes).singleton(),
    ReservationRoutes: asFunction(ReservationRoutes).singleton(),
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
