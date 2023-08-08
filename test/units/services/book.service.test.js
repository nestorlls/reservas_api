const { BookService } = require('../../../src/services');
const {
  BookRepositiryMock,
  BookModelMock: { book, books },
} = require('../../mock');

describe('Book Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should get all books', async () => {
    const BookRepository = BookRepositiryMock;
    BookRepository.getAll.mockReturnValue(books);

    const _bookService = new BookService({ BookRepository });
    const expected = await _bookService.getAll();

    expect(expected).toEqual(books);
  });

  it('Should get book by id', async () => {
    const BookRepository = BookRepositiryMock;
    BookRepository.getById.mockReturnValue(book);

    const _bookService = new BookService({ BookRepository });
    const expected = await _bookService.getById(book._id);

    expect(expected).toEqual(book);
  });

  it('Should update an book by id', async () => {
    const BookRepository = BookRepositiryMock;
    BookRepository.update.mockReturnValue(book);

    const _bookService = new BookService({ BookRepository });
    const expected = await _bookService.update(book._id, {
      available: false,
    });

    expect(expected).toEqual(book);
  });

  it('Should delete an specific book by id', async () => {
    const BookRepository = BookRepositiryMock;
    BookRepository.delete.mockReturnValue(true);

    const _bookService = new BookService({ BookRepository });
    const expected = await _bookService.delete(book._id);

    expect(expected).toEqual(true);
  });
});
