class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ err: err.message });
  }
  return res.status(500).send({ err: err });
};

const notFound = (req, res, next) => {
  return res.status(404).send({ err: 'Resource not found' });
};

module.exports = {
  CustomError,
  errorHandler,
  notFound,
};
