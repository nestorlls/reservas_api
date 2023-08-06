const BaseRepository = require('./base.repository');

let _book = null;

class BookRepository extends BaseRepository {
  constructor({ Book }) {
    super(Book);
    _book = Book;
  }
}

module.exports = BookRepository;
