const User = require('./../Models/userModel');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/AppError');

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });
  res.status(204).json({
    status: 'success',
  });
});
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const update = await User.findByIdAndUpdate(req.user.id, { User: req.body });
  res.status(201).json({
    status: 'success',
    update,
  });
});
