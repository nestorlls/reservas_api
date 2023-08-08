const { UserService } = require('../../../src/services');
const {
  UserRepositoryMock,
  UserModelMock: { user, users },
} = require('../../mock');

describe('User Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should get all users', async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getAll.mockReturnValue(users);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getAll();

    expect(expected).toEqual(users);
  });

  it('Should get user by id', async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getById.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getById(user._id);

    expect(expected).toEqual(user);
  });

  it('Should get user by username', async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getByUsername.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getByUsername(user.username);

    expect(expected).toEqual(user);
  });

  it('Should update an user by id', async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.update.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.updateUser(user._id, user);

    expect(expected).toEqual(user);
  });

  it('Should delete an specific user by id', async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.delete.mockReturnValue(true);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.delete(user._id);

    expect(expected).toEqual(true);
  });
});
