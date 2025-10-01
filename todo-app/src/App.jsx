import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Single-file React To‑Do App (TailwindCSS + Framer Motion)
// Default export: <TodoApp />

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem("todo_tasks_v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const titleRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todo_tasks_v1", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // focus title input when entering add mode
    if (!editingId) titleRef.current?.focus();
  }, [editingId]);

  function addTask(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    if (editingId) {
      // finish editing
      setTasks((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, title: trimmed, desc } : t))
      );
      setEditingId(null);
      setTitle("");
      setDesc("");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: trimmed,
      desc: desc.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
    setDesc("");
  }

  function toggleDone(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function startEdit(task) {
    setEditingId(task.id);
    setTitle(task.title);
    setDesc(task.desc || "");
    titleRef.current?.focus();
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  function filteredTasks() {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      if (filter === "active" && t.done) return false;
      if (filter === "completed" && !t.done) return false;
      if (!q) return true;
      return (t.title + " " + (t.desc || "")).toLowerCase().includes(q);
    });
  }

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.done).length,
    completed: tasks.filter((t) => t.done).length,
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-slate-50 p-6">
      <div className="w-full max-w-2xl">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold mb-1">To‑Do App</h1>
          <p className="text-sm text-slate-500">Simple, localStorage-backed task manager with edit, search and filters.</p>
        </header>

        <form onSubmit={addTask} className="mb-4 bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex gap-3 items-start">
            <input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={editingId ? "Edit task title..." : "Add a new task..."}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:brightness-105"
            >
              {editingId ? "Save" : "Add"}
            </button>
          </div>

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Optional description"
            className="w-full mt-3 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            rows={2}
          />

          {editingId && (
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setDesc("");
                }}
                className="px-3 py-1 rounded-lg border"
              >
                Cancel
              </button>
            </div>
          )}
        </form>

        <section className="mb-4 flex items-center gap-3">
          <div className="flex-1 flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200"
            />

            <div className="inline-flex rounded-lg border overflow-hidden">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-2 ${filter === "all" ? "bg-indigo-50" : ""}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-3 py-2 ${filter === "active" ? "bg-indigo-50" : ""}`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-3 py-2 ${filter === "completed" ? "bg-indigo-50" : ""}`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="text-sm text-slate-500">{stats.active} active • {stats.completed} done</div>
        </section>

        <main>
          <div className="space-y-2">
            <AnimatePresence>
              {filteredTasks().map((task) => (
                <motion.article
                  key={task.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  layout
                  className="bg-white p-4 rounded-2xl shadow-sm flex items-start gap-3"
                >
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleDone(task.id)}
                      className="w-5 h-5 rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className={`font-medium ${task.done ? "line-through text-slate-400" : ""}`}>{task.title}</h3>
                        {task.desc && <p className={`text-sm mt-1 ${task.done ? "text-slate-400" : "text-slate-500"}`}>{task.desc}</p>}
                      </div>

                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => startEdit(task)}
                          className="text-sm px-2 py-1 rounded border"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => removeTask(task.id)}
                          className="text-sm px-2 py-1 rounded border text-rose-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-slate-400">{new Date(task.createdAt).toLocaleString()}</div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            {filteredTasks().length === 0 && (
              <div className="text-center text-slate-500 py-6">No tasks match your filters — add one ✨</div>
            )}
          </div>
        </main>

        <footer className="mt-6 flex items-center justify-between text-sm text-slate-500">
          <div>{stats.total} tasks</div>
          <div className="flex gap-2">
            <button onClick={() => setTasks([])} className="px-3 py-1 rounded border">Clear all</button>
            <button onClick={clearCompleted} className="px-3 py-1 rounded border">Clear completed</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
