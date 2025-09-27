import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [stats, setStats] = useState({ completed: 0, pending: 0 });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState(""); // "" | "true" | "false"

  // Load todos
  const loadTodos = async (p = page, s = statusFilter) => {
    const res = await axios.get("http://localhost:5000/api/todos", {
      params: { page: p, limit: 5, status: s },
    });
    setTodos(res.data.todos);
    setPage(res.data.page);
    setPages(res.data.pages);
  };

  // Load stats
  const loadStats = async () => {
    const res = await axios.get("http://localhost:5000/api/todos/stats");
    setStats(res.data);
  };

  useEffect(() => {
    loadTodos(1, statusFilter);
    loadStats();
  }, [statusFilter]);

  // Add todo
  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post("http://localhost:5000/api/todos", {
      title,
      status: false,
    });
    setTitle("");
    loadTodos(page, statusFilter);
    loadStats();
  };

  // Delete
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    loadTodos(page, statusFilter);
    loadStats();
  };

  // Toggle
  const toggleTodo = async (id, status) => {
    await axios.put(`http://localhost:5000/api/todos/${id}`, {
      status: !status,
    });
    loadTodos(page, statusFilter);
    loadStats();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          📋 MERN Todo App
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow">
            <p className="font-semibold">✅ Hoàn thành</p>
            <p className="text-2xl">{stats.completed}</p>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow">
            <p className="font-semibold">⏳ Chưa xong</p>
            <p className="text-2xl">{stats.pending}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setStatusFilter("")}
            className={`px-3 py-1 rounded-lg shadow ${
              statusFilter === ""
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setStatusFilter("false")}
            className={`px-3 py-1 rounded-lg shadow ${
              statusFilter === "false"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            ⏳ Chưa xong
          </button>
          <button
            onClick={() => setStatusFilter("true")}
            className={`px-3 py-1 rounded-lg shadow ${
              statusFilter === "true"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            ✅ Hoàn thành
          </button>
        </div>

        {/* Form */}
        <div className="flex mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập công việc..."
            className="flex-1 px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-r-lg shadow hover:opacity-90 transition"
          >
            ➕ Thêm
          </button>
        </div>

        {/* List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg shadow"
            >
              <span
                className={`flex-1 ${
                  todo.status ? "line-through text-gray-400" : "text-gray-700"
                }`}
              >
                {todo.title}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleTodo(todo._id, todo.status)}
                  className={`px-3 py-1 text-sm font-semibold rounded-lg shadow transition ${
                    todo.status
                      ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {todo.status ? "↩️ Hoàn tác" : "✅ Hoàn thành"}
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="px-3 py-1 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
                >
                  🗑️ Xoá
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Không có công việc nào ✨
          </p>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page <= 1}
            onClick={() => loadTodos(page - 1, statusFilter)}
            className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            ⬅️ Trước
          </button>
          <span>
            Trang {page}/{pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => loadTodos(page + 1, statusFilter)}
            className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Sau ➡️
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
