import { useState, useEffect } from "react";
import axios from "axios";

export default function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getNotes").then((res) => {
      const data = res.data;
      setNotes(data.reverse());
    });
  }, [notes]);

  function deleteItem(id) {
    axios
      .delete(`http://localhost:8000/deleteNote/${id}`)
      .then((res) => console.log(res));
  }

  return (
    <ul className="flex w-fit flex-wrap justify-start">
      {notes.map((item) => (
        <li
          key={item._id}
          className="relative h-fit w-fit p-2 rounded-lg border border-black bg-slate-800 text-white m-3 "
        >
          <div className="text-left content w-56">
            <h1 className="text-slate-300">{item.title}</h1>
            <p className="text-slate-600 max-h-20 truncate">{item.content}</p>
          </div>
          <div className="buttons flex items-center justify-evenly gap-3 mt-3">
            <a
              href={`/view/${item._id}`}
              className="bg-sky-700 rounded px-2 py-1 text-sky-950 cursor-pointer hover:bg-sky-500"
            >
              Show More
            </a>
            <a
              className="bg-red-700 rounded px-2 py-1 text-red-950 cursor-pointer hover:bg-red-600"
              onClick={() => deleteItem(item._id)}
            >
              Delete Note
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
