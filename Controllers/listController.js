const List = require('./../Models/listModel.js');
const catchAsync = require('./../Utils/catchAsync');
const AppError = require('./../Utils/AppError');

exports.getList = catchAsync(async (req, res, next) => {
  const myList = await List.findById(req.params.id).populate({
    path: 'user',
    select: '_id',
  });
  if (myList.user.id !== req.user.id) {
    return next(new AppError('You do not have access to this list', 401));
  }

  res.status(200).json({
    status: 'success',
    list: myList,
  });
});

exports.createList = catchAsync(async (req, res, next) => {
  const newList = await List.create(req.body);
  res.status(201).json({
    status: 'success',
    newList,
  });
});

exports.updateList = async (req, res) => {
  try {
    const updated = await List.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: 'success',
      updated,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: ('Invalid Id please try again!', err),
    });
  }
};

exports.deleteList = async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
