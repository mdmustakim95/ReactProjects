import React, { useEffect, useState } from "react";

// Simple Todo App - Single-file React component
// Usage: paste into a create-react-app or Vite React project.
// TailwindCSS classes are used for styling. If you don't have Tailwind,
// either add it or replace classNames with your own CSS.

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem("todos_v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos_v1", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e && e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = {
      id: Date.now().toString(),
      text: trimmed,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((t) => [newTodo, ...t]);
    setText("");
  }

  function toggleDone(id) {
    setTodos((t) => t.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }

  function removeTodo(id) {
    setTodos((t) => t.filter((todo) => todo.id !== id));
  }

  function startEditing(todo) {
    setEditingId(todo.id);
    setEditText(todo.text);
  }

  function saveEdit(id) {
    const trimmed = editText.trim();
    if (!trimmed) {
      // if empty after edit, remove it
      removeTodo(id);
    } else {
      setTodos((t) => t.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo)));
    }
    setEditingId(null);
    setEditText("");
  }

  function clearCompleted() {
    setTodos((t) => t.filter((todo) => !todo.done));
  }

  const filtered = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Todo</h1>
          <div className="text-sm text-gray-500">{remaining} left</div>
        </header>

        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
          >
            Add
          </button>
        </form>

        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-sm ${filter === "all" ? "bg-indigo-100" : "hover:bg-gray-100"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded-full text-sm ${filter === "active" ? "bg-indigo-100" : "hover:bg-gray-100"}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded-full text-sm ${filter === "completed" ? "bg-indigo-100" : "hover:bg-gray-100"}`}
            >
              Completed
            </button>
          </div>

          <div>
            <button
              onClick={clearCompleted}
              className="text-sm text-gray-500 hover:underline"
              disabled={!todos.some((t) => t.done)}
            >
              Clear completed
            </button>
          </div>
        </div>

        <ul className="space-y-2">
          {filtered.length === 0 ? (
            <li className="text-center text-gray-400 py-6">No tasks — add one!</li>
          ) : (
            filtered.map((todo) => (
              <li key={todo.id} className="flex items-center gap-3 border rounded-lg px-3 py-2">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleDone(todo.id)}
                  className="w-5 h-5 rounded"
                />

                <div className="flex-1 min-w-0">
                  {editingId === todo.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        saveEdit(todo.id);
                      }}
                    >
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => saveEdit(todo.id)}
                        autoFocus
                        className="w-full px-2 py-1 rounded border focus:outline-none"
                      />
                    </form>
                  ) : (
                    <div
                      onDoubleClick={() => startEditing(todo)}
                      className={`truncate ${todo.done ? "line-through text-gray-400" : ""}`}
                      title={todo.text}
                    >
                      {todo.text}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">{new Date(todo.createdAt).toLocaleString()}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditing(todo)}
                    className="text-sm px-2 py-1 rounded hover:bg-gray-100"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="text-sm px-2 py-1 rounded hover:bg-red-50 text-red-600"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        <footer className="mt-6 text-sm text-gray-500 text-center">
          Built with ❤️ — double-click a task to edit it.
        </footer>
      </div>
    </div>
  );
}
