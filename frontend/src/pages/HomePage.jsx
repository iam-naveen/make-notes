import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    try {
      await axios.post("http://localhost:8000/todos", { title, description });
      setTitle("");
      setDescription("");
      fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleEditTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingTodoId(todo._id);
  };

  const handleUpdateTodo = async (id, completed) => {
    try {
      await axios.put(`http://localhost:8000/todos/${id}`, {
        completed: !completed,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateEditTodo = async () => {
    try {
      await axios.put(`http://localhost:8000/todos/${editingTodoId}`, {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      setEditingTodoId(null);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">Todo App</h1>
        <div className="mt-4 bg-slate-800 p-5 rounded-md">
          {editingTodoId ? (
            <>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 border border-gray-300 rounded px-4 py-2 w-full"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleUpdateEditTodo}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update Todo
                </button>
                <button
                  onClick={() => setEditingTodoId(null)}
                  className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 border border-gray-300 rounded px-4 py-2 w-full"
              />
              <button
                onClick={handleCreateTodo}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Create Todo
              </button>
            </>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">Todo List</h2>
          <ul className="mt-4 space-y-2 bg-slate-800 p-5 rounded-md">
            {todos.length ? (todos.map((todo) => (
              <li
                key={todo._id}
                className={`flex items-center justify-between bg-white p-4 shadow rounded-lg ${
                  todo.completed ? " bg-slate-300" : ""
                }`}
              >
                <span
                  className={`flex-grow ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.title} - {todo.description}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateTodo(todo._id, todo.completed)}
                    className={`px-2 py-1 rounded ${
                      todo.completed
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {todo.completed ? "Incomplete" : "Complete"}
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditTodo(todo)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))): (<div className="text-white">No Todos to Display</div>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
