import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Stats from "./components/Stats";
import api from "./api"; // dùng api.js thay vì axios trực tiếp

function App() {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ completed: 0, pending: 0 });
  const [title, setTitle] = useState("");

  // Bộ lọc
  const [statusFilter, setStatusFilter] = useState(""); // "", "true", "false"

  // Phân trang
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // Load todos
  const loadTodos = async (p = page, s = statusFilter) => {
    try {
      const res = await api.get("/todos", {
        params: { page: p, limit: 5, status: s },
      });
      setTodos(res.data.todos || []);
      setPage(res.data.page || 1);
      setPages(res.data.pages || 1);
    } catch (err) {
      console.error("❌ Lỗi loadTodos:", err);
    }
  };

  // Load stats
  const loadStats = async () => {
    try {
      const res = await api.get("/todos/stats");
      setStats(res.data);
    } catch (err) {
      console.error("❌ Lỗi loadStats:", err);
    }
  };

  // Add todo
  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      await api.post("/todos", { title, status: false });
      setTitle("");
      loadTodos(page, statusFilter);
      loadStats();
    } catch (err) {
      console.error("❌ Lỗi addTodo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      loadTodos(page, statusFilter);
      loadStats();
    } catch (err) {
      console.error("❌ Lỗi deleteTodo:", err);
    }
  };

  // Toggle status
  const toggleTodo = async (id, status) => {
    try {
      await api.put(`/todos/${id}`, { status: !status });
      loadTodos(page, statusFilter);
      loadStats();
    } catch (err) {
      console.error("❌ Lỗi toggleTodo:", err);
    }
  };

  useEffect(() => {
    loadTodos();
    loadStats();
  }, [page, statusFilter]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          📋 MERN Todo App
        </h1>

        {/* Stats */}
        <Stats completed={stats.completed} pending={stats.pending} />

        {/* Form thêm todo */}
        <TodoForm
          title={title}
          setTitle={setTitle}
          onAdd={addTodo}
        />

        {/* Filter */}
        <div className="flex gap-3 mb-6 items-center">
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="px-3 py-2 border rounded"
          >
            <option value="">-- Tất cả --</option>
            <option value="true">✅ Hoàn thành</option>
            <option value="false">⏳ Chưa xong</option>
          </select>
          <button
            onClick={() => {
              setStatusFilter("");
              setPage(1);
            }}
            className="px-3 py-2 bg-gray-400 text-white rounded"
          >
            ❌ Reset
          </button>
        </div>

        {/* Todo list */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            ◀️ Trước
          </button>
          <span>
            Trang {page}/{pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Sau ▶️
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
