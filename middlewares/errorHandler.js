module.exports = (err, req, res, _next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message =
    statusCode === 500 ? "An error has occurred on the server" : err.message;

  res.status(statusCode).send({ message });
};
