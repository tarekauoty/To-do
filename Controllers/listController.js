const List = require('./../Models/listModel.js');

exports.getList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate('user');
    res.status(200).json({
      status: 'success',
      list,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createList = async (req, res) => {
  try {
    const newList = await List.create(req.body);
    res.status(201).json({
      status: 'success',
      newList,
    });
  } catch (err) {
    res.status(403).json({
      status: 'fail',
      message: err,
    });
  }
};

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
