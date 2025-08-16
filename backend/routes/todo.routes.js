const express = require("express");
const Todo = require("../models/todo.model");
const { messaging } = require("firebase-admin");

const router = express.Router();

//post request to create a new todo

router.post("/", async (req, res) => {
  try {
    const { uid, id, title, completed } = req.body;

    if (!uid || !id || !title ) {
      return res.status(400).json({ message: "UID, id and title are requied" });
    }

    const newTodo = {
      id,
      title,
      completed: completed || false,
      createdAt: new Date(),
    };

    const userDoc = await Todo.findOne({ uid });

    if (userDoc) {
      userDoc.todos.push(newTodo);
      await userDoc.save();
      return res.status(201).json(newTodo);
    } else {
      const newUserDoc = new Todo({
        uid,
        todos: [newTodo],
      });
      await newUserDoc.save();
      return res.status(201).json(newTodo);
    }
  } catch (e) {
    console.error("Failed to add todo-item", e.response?.data || e.message);
    return res.status(500).json({ message: "Error creating todo", error: e });
  }
});

//get all todos of specific user

router.get("/:uid", async (req, res) => {
  try {
    const userDoc = await Todo.findOne({ uid: req.params.uid });

    if (!userDoc) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const sortedDocs = userDoc.todos.sort((a, b) => b.createdAt - a.createdAt);
    res.json(sortedDocs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//update a todo

router.put("/update/:uid/:todoId", async (req, res) => {
  try {
    const { uid, todoId } = req.params;
    const { title, completed } = req.body;

    if (title === undefined && completed === undefined) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updateQuery = {};

    if (title !== undefined) {
      updateQuery["todos.$.title"] = title;
    }
    if (completed !== undefined) {
      updateQuery["todos.$.completed"] = completed;
    }

    const result = await Todo.updateOne(
      { uid, "todos.id": todoId },
      { $set: updateQuery }
    );
    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: "Todo not found for this user" });
    }

    return res.status(200).json("Todo update Successfully");
  } catch (e) {
    return res.status(500).json({ message: "Error updating todo", error: e });
  }
});

//deleta a todo

router.delete("/delete/:uid/:todoId", async (req, res) => {
  try {
    const { uid, todoId } = req.params;

    const result = await Todo.updateOne(
      { uid },
      { $pull: { todos: { id: todoId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json("no todo found for this user");
    }
  } catch (e) {
    res.status(500).json({ message: "Error deleting todo", error: e });
  }
});

module.exports = router;
