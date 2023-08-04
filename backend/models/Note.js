import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const NoteModel = new mongoose.model("Note", NoteSchema);

export default NoteModel;
