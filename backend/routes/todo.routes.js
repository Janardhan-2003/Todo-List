import express from "express";
import Todo from "../models/todo.model.js";

const router = express.Router();

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const { uid, title, completed } = req.body;

    const newTodo = new Todo({
      uid,
      title,
      completed: completed || false
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all todos for a specific user
router.get("/:uid", async (req, res) => {
  try {
    const todos = await Todo.find({ uid: req.params.uid }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
