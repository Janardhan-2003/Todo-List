const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const nestedSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  todos: [todoSchema],
});

const Todo = mongoose.model("Todo", nestedSchema);
module.exports = Todo;
