import { useEffect, useState } from "react";
import api from "../api";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetchTodos();
  }, [status, page]);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos", {
        params: { status, page, limit: 5 },
      });
      setTodos(res.data.tasks || []);
      setPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Danh sách công việc</h2>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Tất cả</option>
        <option value="true">Hoàn thành</option>
        <option value="false">Chưa hoàn thành</option>
      </select>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <b>{todo.title}</b> - {todo.status ? "✅ Hoàn thành" : "❌ Chưa"}
            {" "} (Hạn: {todo.dueDate?.substring(0, 10)})
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p>Không có công việc nào ✨</p>}

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Trang trước
      </button>
      <span>Trang {page}/{pages}</span>
      <button onClick={() => setPage(page + 1)} disabled={page === pages}>
        Trang sau
      </button>
    </div>
  );
}
