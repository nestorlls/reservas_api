const container = require('./src/startup/container');
const server = container.resolve('app');
const { MONGODB_URL } = container.resolve('config');

const mongoose = require('mongoose');
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    server.start();
  })
  .catch((err) => {
    console.log(err);
  });
