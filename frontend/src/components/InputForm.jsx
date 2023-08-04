import { useState } from "react";
import axios from "axios";

export default function InputForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function postData(event) {
    event.preventDefault();

    if (title && content) {

      // send the data to the backend
      let formData = {
        title: title,
        content: content,
      };

      axios
        .post("http://localhost:8000/addNote", formData)
        .then((res) => console.log(res));

      // reset the form
      setTitle("");
      setContent("");
    } else {
      alert("Empty Notes cannot be added!");
    }

  }

  return (
    <form
      onSubmit={postData}
      className="user-input-form mx-auto my-10 text-black max-w-3xl gap-2"
    >
      <div className="input-fields p-3 border-2 border-black rounded-t-lg w-full flex flex-col gap-2">
        <input
          type="text"
          className="font-semibold text-xl bg-transparent outline-none p-2 placeholder:font-normal"
          name="notes-title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={3}
          cols={40}
          className="text-lg bg-transparent outline-none p-2"
          name="notes-content"
          placeholder="Type your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="submit-button h-fit w-full px-5 py-2 text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-b-lg border-b border-x border-black"
      >
        Add Note
      </button>
    </form>
  );
}
