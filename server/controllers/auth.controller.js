const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { CustomError } = require('../utilities/errors');
const { uploadToCloud } = require('../utilities/upload.config');

module.exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return next(
      new CustomError(
        StatusCodes.BAD_REQUEST,
        'Provide username, email password and confirm password'
      )
    );
  }

  if (password !== confirmPassword) {
    return next(
      new CustomError(StatusCodes.BAD_REQUEST, 'Passwords do not match')
    );
  }

  const dp = req.file?.path ? await uploadToCloud(req.file.path) : undefined;

  // Check if a user with that email or username exists
  const userInDb = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (userInDb) {
    return next(
      new CustomError(
        StatusCodes.BAD_REQUEST,
        'A user with this email/username exists'
      )
    );
  }

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    dp,
  });

  const { password: userPassword, ...rest } = user._doc;

  const token = await user.createJWT();

  res.status(StatusCodes.CREATED).send({
    user: { ...rest, token },
    message: 'Account Created',
  });
});

module.exports.login = asyncHandler(async (req, res, next) => {
  const { detail, password } = req.body;

  if (!detail || !password) {
    return next(
      new CustomError(
        StatusCodes.BAD_REQUEST,
        'Provide username/email and password'
      )
    );
  }

  const user = await User.findOne({
    $or: [{ email: detail }, { username: detail }],
  });

  if (!user) {
    return next(new CustomError(StatusCodes.NOT_FOUND, 'User does not exist'));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return next(new CustomError(StatusCodes.BAD_REQUEST, 'Wrong password'));
  }

  const { password: userPassword, ...rest } = user._doc;

  const token = await user.createJWT();

  res.status(200).send({
    user: { ...rest, token },
    message: 'Login Successful',
  });
});

module.exports.getUsers = asyncHandler(async (req, res, next) => {});
