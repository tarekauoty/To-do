const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A list must have a name'],
  },
  tasks: [
    [
      {
        type: String,
        unique: true,
        isDone: {
          type: Boolean,
          default: false,
        },
      },
    ],
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A list must belong to a user!'],
    select: false,
  },
});

const List = mongoose.model('List', listSchema);
module.exports = List;
