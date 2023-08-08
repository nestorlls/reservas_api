const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    available: { type: Boolean },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
