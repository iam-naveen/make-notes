import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ShowMore() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/getNote/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  return (
    <div className="container flex flex-col p-5">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl font-light">{content}</p>
    </div>
  );
}
