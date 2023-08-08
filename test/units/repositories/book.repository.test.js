const { BookRepository } = require('../../../src/repositories');
const mockingoose = require('mockingoose');
const { Book } = require('../../../src/models');
let {
  BookModelMock: { book, books },
} = require('../../mock');

describe('Book Repository Tests', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('Should get all books', async () => {
    books = books.map((book) => {
      delete book.password;
      return book;
    });

    mockingoose(Book).toReturn(books, 'find');

    const _bookRepository = new BookRepository({ Book });
    const expected = await _bookRepository.getAll();

    expect(JSON.parse(JSON.stringify(expected))).toEqual(books);
  });

  it('Should get book by id', async () => {
    const _book = { ...book };
    mockingoose(Book).toReturn(_book, 'findOne');

    const _bookRepository = new BookRepository({ Book });
    const expected = await _bookRepository.getById(_book._id);

    expect(JSON.parse(JSON.stringify(expected))).toEqual(_book);
  });

  it('Should create a book', async () => {
    mockingoose(Book).toReturn(book, 'create');

    const _bookRepository = new BookRepository({ Book });
    const expected = await _bookRepository.create(book);

    expect(JSON.parse(JSON.stringify(expected))).toEqual(book);
  });

  it('Should update an book by id', async () => {
    const _book = { ...book };
    mockingoose(Book).toReturn(_book, 'findOneAndUpdate');

    const _bookRepository = new BookRepository({ Book });
    const expected = await _bookRepository.update(_book._id, {
      title: 'test',
    });

    expect(JSON.parse(JSON.stringify(expected))).toEqual(_book);
  });

  it('Should delete an specific book by id', async () => {
    mockingoose(Book).toReturn(book, 'findOneAndDelete');

    const _bookRepository = new BookRepository({ Book });
    const expected = await _bookRepository.delete(book._id);

    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  });
});
