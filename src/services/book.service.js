const BaseService = require('./base.service');

let _bookRepository = null;

class BookService extends BaseService {
  constructor({ BookRepository }) {
    super(BookRepository);
    _bookRepository = BookRepository;
  }

  async createBook(book) {
    const { title, author, available } = book;
    return await _bookRepository.create({
      title,
      author,
      available: true,
    });
  }
}

module.exports = BookService;
