const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');

const AppError = require('./../Utils/AppError');
const catchAsync = require('./../Utils/catchAsync');
const User = require('./../Models/userModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const createSendToken = (user, statCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expiresIn: process.env.JWT_COOKIE_EXPIRE_IN,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statCode).json({
    status: 'success',
    token,
    user,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body });
    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return 'Please enter your email and password';

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password)))
      res
        .status(401)
        .json({ status: 'fail', message: 'incorrect email or password' });
    createSendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Please log in to get access', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user is no longer exists', 401));
  }
  req.user = currentUser;
  next();
});
