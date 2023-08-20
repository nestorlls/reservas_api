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
    this.isValidId({ id, message: 'invalid Id or Id is required' });

    const bookFound = await _bookRepository.getById(id);

    this.isValidValue({ value: bookFound, message: 'Book does not exist' });

    return bookFound;
  }

  async update(id, book) {
    this.isValidId({ id, message: 'invalid Id or Id is required' });

    const bookFound = await _bookRepository.getById(id);

    this.isValidValue({ value: bookFound, message: 'Book does not exist' });

    return await _bookRepository.update(id, book);
  }

  async delete(id) {
    this.isValidId({ id, message: 'invalid Id or Id is required' });

    const bookFound = await _bookRepository.getById(id);

    this.isValidValue({ value: bookFound, message: 'Book does not exist' });

    return await _bookRepository.delete(id);
  }

  async createBook(book) {
    const { title, author } = book;
    return await _bookRepository.create({
      title,
      author,
      available: true,
    });
  }

  isValidId({ id, message }) {
    if (!isValidObjectId(id)) {
      const error = new Error();
      error.status = 400;
      error.message = message;
      throw error;
    }
  }

  isValidValue({ value, message }) {
    if (!value) {
      const error = new Error();
      error.status = 400;
      error.message = message;
      throw error;
    }
  }
}

module.exports = BookService;
