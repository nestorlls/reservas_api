module.exports = function (err, req, res, next) {
  const httpStatus = err.status || 500;
  const message = err.message || 'Internal server error.';
  res.send({
    status: httpStatus,
    message,
  });
};
