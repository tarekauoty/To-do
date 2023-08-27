const User = require('./../Models/userModel');
const List = require('./../Models/listModel');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/AppError');

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });
  res.status(204).json({
    status: 'success',
  });
});

// exports.getMe = (req, res, next) => {
//   req.params.id = req.user.id;
//   next();
// };

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('you do not have access to this user', 401));
  }

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const update = await User.findByIdAndUpdate(req.user.id, { User: req.body });
  res.status(201).json({
    status: 'success',
    update,
  });
});
