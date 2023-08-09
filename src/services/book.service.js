const BaseService = require('./base.service');
const { isValidObjectId } = require('mongoose');

let _bookRepository = null;

class BookService extends BaseService {
  constructor({ BookRepository }) {
    super(BookRepository);
    _bookRepository = BookRepository;
  }

  async getAll() {
    return await _bookRepository.getAll();
  }

  async getById(id) {
    if (!isValidObjectId(id)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Correct Book id is required';
      return error;
    }

    return await _bookRepository.getById(id);
  }

  async update(id, book) {
    if (!isValidObjectId(id)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Correct Book id is required';
      return error;
    }

    return await _bookRepository.update(id, book);
  }

  async delete(id) {
    if (!isValidObjectId(id)) {
      const error = new Error();
      error.status = 400;
      error.message = 'Correct Book id is required';
      return error;
    }

    return await _bookRepository.delete(id);
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
