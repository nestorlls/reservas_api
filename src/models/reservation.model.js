const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReservationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
      autopopulate: true,
    },
    date_reserved: {
      type: Date,
      required: true,
    },
    date_due: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

ReservationSchema.plugin(require('mongoose-autopopulate'));

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;
