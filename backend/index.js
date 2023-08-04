import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import Note from "./models/Note.js";

const app = express();
app.use(express.json());
app.use(cors());


app.post("/create", function (req, res) {
  const data = req.body;

  const entry = new Note(data);
  entry.save();

  res.status(200).send();
});

app.get("/getNotes", function (req, res) {
  Note.find({}).then((data) => {
    res.send(data);
    console.log(data);
  });
});

app.delete("/removeNote/:id", function (req, res) {
  const noteId = req.params.id;
  Note.findByIdAndDelete(noteId)
    .then(() => {
      res.send("Note deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting note:", error);
      res.status(500).send("Error deleting note");
    });
});


mongoose
  .connect(
    "mongodb+srv://root:PNEoZEIU5ajO6EQp@test.jz2qknw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    // Server Running in PORT 8000
    app.listen(8000, () => console.log("Server is running"));
  })
  .catch((err) => {
    console.log(err);
  });
