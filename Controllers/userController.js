const User = require('./../Models/userModel');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/AppError');

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });
  res.status(204).json({
    status: 'success',
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('Invalid id user not found', 404));
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

exports.myLists = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log(user);
  const lists = await User.find({ data: user.list });
  console.log(lists);
  if (!lists || !user) {
    return next(new AppError('User or lists not found!', 404));
  }
  res.status(200).json({
    status: 'success',
    lists,
  });
});
