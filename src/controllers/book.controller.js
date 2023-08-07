let _bookService = null;

class BookController {
  constructor({ BookService }) {
    _bookService = BookService;
  }

  async create(req, res) {
    const { body } = req;
    const bookCreated = await _bookService.create(body);
    return res.send(bookCreated);
  }

  async update(req, res) {
    const { bookid } = req.params;
    const { body } = req;

    const bookUpdated = await _bookService.update(bookid, body);
    return res.send(bookUpdated);
  }

  async delete(req, res) {
    const { bookid } = req.params;
    const bookDeleted = await _bookService.delete(bookid);
    return res.send(bookDeleted);
  }

  async getAll(req, res) {
    const books = await _bookService.getAll();
    return res.send(books);
  }

  async getById(req, res) {
    const { bookid } = req.params;
    const book = await _bookService.getById(bookid);
    return res.send(book);
  }
}

module.exports = BookController;
