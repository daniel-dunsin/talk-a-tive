require('dotenv').config();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { CustomError } = require('../utilities/errors');

module.exports = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new CustomError(401, 'Unauthorized Request'));
  }

  const token = authHeader.split(' ')[1];

  const isVerified = await jwt.verify(token, process.env.JWT_SECRET);

  if (!isVerified) {
    return next(new CustomError(401, 'Invalid or expired token'));
  }

  req.userId = isVerified.id;

  next();
});
