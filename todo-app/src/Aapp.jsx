import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Trash2, Edit2, Plus, Search, XCircle } from "lucide-react";

// Beautified Single-file React To‑Do App (TailwindCSS + Framer Motion + lucide-react icons)
// Default export: <TodoApp />

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem("todo_tasks_v2");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const titleRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todo_tasks_v2", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!editingId) titleRef.current?.focus();
  }, [editingId]);

  function addTask(e) {
    e?.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    if (editingId) {
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
      priority: "normal",
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

  const progress = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 flex items-start justify-center p-6">
      <div className="w-full max-w-3xl">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">My Tasks</h1>
              <p className="text-sm text-slate-500 mt-1">Stay focused — small wins every day.</p>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500">Progress</div>
              <div className="w-40 mt-1 bg-white rounded-full p-1 shadow-inner">
                <div
                  className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm text-slate-600 mt-1">{progress}% complete</div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: input + filters */}
          <div className="md:col-span-2">
            <form onSubmit={addTask} className="bg-white p-6 rounded-3xl shadow-md">
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={editingId ? "Edit task title..." : "What needs to be done?"}
                    className="w-full text-lg font-medium px-4 py-3 rounded-xl border border-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />

                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Add a short note (optional)"
                    className="w-full mt-3 px-4 py-3 rounded-xl border border-slate-100 resize-none text-sm text-slate-600"
                    rows={3}
                  />

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium shadow hover:brightness-105"
                    >
                      <Plus size={16} />
                      {editingId ? "Save Task" : "Add Task"}
                    </button>

                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setTitle("");
                          setDesc("");
                        }}
                        className="px-4 py-2 rounded-xl border text-slate-600"
                      >
                        Cancel
                      </button>
                    )}

                    <div className="ml-auto text-sm text-slate-500">{stats.active} active • {stats.completed} done</div>
                  </div>
                </div>

                <div className="w-44 hidden md:block">
                  <div className="bg-emerald-50 p-3 rounded-2xl h-full">
                    <div className="text-xs text-slate-500">Quick tips</div>
                    <ul className="mt-2 text-sm text-slate-700 space-y-2">
                      <li>Use short titles</li>
                      <li>Prioritize morning tasks</li>
                      <li>Mark done to track progress</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center bg-white px-3 py-2 rounded-xl shadow-sm w-full">
                <Search size={16} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tasks"
                  className="ml-3 flex-1 outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="ml-2">
                    <XCircle size={18} />
                  </button>
                )}
              </div>

              <div className="inline-flex rounded-xl bg-white shadow-sm overflow-hidden">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 text-sm ${filter === "all" ? "bg-emerald-100 text-emerald-800" : "text-slate-600"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-2 text-sm ${filter === "active" ? "bg-emerald-100 text-emerald-800" : "text-slate-600"}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-4 py-2 text-sm ${filter === "completed" ? "bg-emerald-100 text-emerald-800" : "text-slate-600"}`}
                >
                  Done
                </button>
              </div>
            </div>

            <main className="mt-4">
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredTasks().map((task) => (
                    <motion.article
                      key={task.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      layout
                      className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-shadow flex items-start gap-3"
                    >
                      <div>
                        <button
                          onClick={() => toggleDone(task.id)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${task.done ? "bg-emerald-600 border-emerald-600 text-white" : "bg-white text-slate-600"}`}
                        >
                          <CheckSquare size={18} />
                        </button>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className={`text-lg font-semibold ${task.done ? "line-through text-slate-400" : "text-slate-800"}`}>{task.title}</h3>
                            {task.desc && <p className={`text-sm mt-1 ${task.done ? "text-slate-400" : "text-slate-600"}`}>{task.desc}</p>}
                          </div>

                          <div className="flex gap-2 items-center">
                            <button onClick={() => startEdit(task)} className="px-3 py-1 rounded-xl border text-sm flex items-center gap-2">
                              <Edit2 size={14} /> Edit
                            </button>

                            <button onClick={() => removeTask(task.id)} className="px-3 py-1 rounded-xl border text-sm flex items-center gap-2 text-rose-600">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                          <div>{new Date(task.createdAt).toLocaleString()}</div>
                          <div>{task.done ? "Completed" : "Pending"}</div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>

                {filteredTasks().length === 0 && (
                  <div className="text-center text-slate-500 py-12 bg-white rounded-2xl shadow">
                    <div className="text-2xl">No tasks yet</div>
                    <div className="mt-2">Add your first task using the form above — small steps win the race.</div>
                  </div>
                )}
              </div>
            </main>

            <footer className="mt-6 flex items-center justify-between">
              <div className="text-sm text-slate-600">{stats.total} tasks — {stats.active} active</div>
              <div className="flex gap-2">
                <button onClick={() => setTasks([])} className="px-4 py-2 rounded-xl border text-sm">Clear all</button>
                <button onClick={clearCompleted} className="px-4 py-2 rounded-xl border text-sm">Clear completed</button>
              </div>
            </footer>
          </div>

          {/* Right column: overview / recent */}
          <aside className="hidden md:block">
            <div className="bg-white p-5 rounded-2xl shadow-md sticky top-6">
              <div className="text-sm text-slate-500">Overview</div>
              <div className="mt-3">
                <div className="text-xs text-slate-500">Completed</div>
                <div className="text-2xl font-semibold mt-1">{stats.completed}</div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-slate-500">Active</div>
                <div className="text-2xl font-semibold mt-1">{stats.active}</div>
              </div>

              <div className="mt-6">
                <div className="text-xs text-slate-500">Recent</div>
                <ul className="mt-2 text-sm space-y-2">
                  {tasks.slice(0, 5).map((t) => (
                    <li key={t.id} className="truncate">{t.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
