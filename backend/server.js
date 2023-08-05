import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import Todo from "./models/Todo.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/todos", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTodo = new Todo({
      title,
      description,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create Todo item", error: err.message });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch Todo items", error: err.message });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todoId = req.params.id;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description, completed },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update Todo item", error: err.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;

    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    res.json(deletedTodo);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to delete Todo item", error: err.message });
  }
});

app.patch("/todos/:id/done", async (req, res) => {
  try {
    const todoId = req.params.id;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({ message: "Invalid completed status" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { completed },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update Todo item", error: err.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://root:PNEoZEIU5ajO6EQp@test.jz2qknw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8000, () => console.log("Server is running"));
  })
  .catch((err) => {
    console.log(err);
  });
