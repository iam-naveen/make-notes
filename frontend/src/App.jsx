import { useState } from "react";
import DisplayArea from "./components/DisplayArea";

export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [NotesArray, setNotesArray] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    let formData = {
      title: title,
      content: content,
    };

    setNotesArray((prev) => [formData, ...prev]);
  }

  function handleTitleChange(event) {
    let text = event.target.value;
    setTitle(text);
  }

  function handleContentChange(event) {
    let content = event.target.value;
    setContent(content);
  }

  return (
    <div className="container flex flex-col h-full w-full items-center justify-center">
      <form className="flex items-end gap-2" onSubmit={handleSubmit}>
        <div className="input-fields flex flex-col gap-2">
          <input
            type="text"
            className="rounded p-2"
            name="notes-title"
            id="notes-content"
            placeholder="Type your title here..."
            onChange={handleTitleChange}
          />
          <textarea
            rows={8}
            cols={40}
            className="rounded p-2"
            name="notes-content"
            id="notes-content"
            placeholder="Type your content here..."
            onChange={handleContentChange}
          />
        </div>
        <button
          type="submit"
          className="h-10 px-5 py-2 bg-slate-400 hover:bg-slate-600 rounded"
        >
          Add
        </button>
      </form>
      Dhanush
      <DisplayArea notes={NotesArray} />
    </div>
  );
}
