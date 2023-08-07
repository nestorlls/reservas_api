const BaseService = require('./base.service');

let _bookRepository = null;

class BookService extends BaseService {
  constructor({ BookRepository }) {
    super(BookRepository);
    _bookRepository = BookRepository;
  }
}

module.exports = BookService;
