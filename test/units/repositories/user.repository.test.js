const { UserRepository } = require('../../../src/repositories');
const mockingoose = require('mockingoose');
const { User } = require('../../../src/models');
let {
  UserModelMock: { user, users },
} = require('../../mock');

describe('User Repository Tests', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('Should get all users', async () => {
    users = users.map((user) => {
      delete user.password;
      return user;
    });

    mockingoose(User).toReturn(users, 'find');

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getAll();

    expect(JSON.parse(JSON.stringify(expected))).toEqual(users);
  });

  it('Should get user by id', async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(_user, 'findOne');

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getById(_user._id);

    expect(JSON.parse(JSON.stringify(expected))).toEqual(_user);
  });

  it('Should get user by username', async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(_user, 'findOne');

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getByUsername(_user.username);

    expect(JSON.parse(JSON.stringify(expected))).toEqual(_user);
  });

  it('Should update an specific user by id', async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(_user, 'findOneAndUpdate');

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.update(_user._id, {
      username: 'testino',
    });

    expect(JSON.parse(JSON.stringify(expected))).toEqual(_user);
  });

  it('Should delete an specific user by id', async () => {
    mockingoose(User).toReturn(user, 'findOneAndDelete');

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.delete(user._id);

    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  });
});
