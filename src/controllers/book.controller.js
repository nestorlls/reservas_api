let _bookService = null;

class BookController {
  constructor({ BookService }) {
    _bookService = BookService;
  }

  async create(req, res) {
    const { body } = req;
    const bookCreated = await _bookService.createBook(body);
    return res.send(bookCreated);
  }

  async update(req, res) {
    const { bookId } = req.params;
    const { body } = req;

    const bookUpdated = await _bookService.update(bookId, body);
    return res.send(bookUpdated);
  }

  async delete(req, res) {
    const { bookId } = req.params;
    const bookDeleted = await _bookService.delete(bookId);
    return res.send(bookDeleted);
  }

  async getAll(req, res) {
    const { page, pageSize } = req.query;
    const books = await _bookService.getAll(pageSize, page);
    return res.send(books);
  }

  async getById(req, res) {
    const { bookId } = req.params;
    const book = await _bookService.getById(bookId);
    return res.send(book);
  }
}

module.exports = BookController;
