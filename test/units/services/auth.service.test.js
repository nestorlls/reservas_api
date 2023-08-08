const { UserService } = require('../../../src/services');
const {
  UserRepositoryMock,
  UserModelMock: { user, users },
} = require('../../mock');

describe('Authentication Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should create a new user', async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.create.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.create(user);

    expect(expected).toEqual(user);
  });
});
