const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    id: { type: String, require: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // remove time part
        return today;
      },
    },
  },
  { _id: false }
);

const nestedSchema = new mongoose.Schema({
  uid: { type: String, require: true, unique: true },
  todos: [todoSchema],
});

const Todo = mongoose.model("Todo", nestedSchema);

module.exports = Todo;
