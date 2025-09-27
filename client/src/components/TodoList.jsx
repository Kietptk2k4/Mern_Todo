import { useEffect, useState } from "react";
import axios from "axios";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTodos();
  }, [status, page]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos", {
        params: { status, page, limit: 5 },
      });
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Danh sách công việc</h2>
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">Tất cả</option>
        <option value="true">Hoàn thành</option>
        <option value="false">Chưa hoàn thành</option>
      </select>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <b>{todo.title}</b> -{" "}
            {todo.status ? "✅ Hoàn thành" : "❌ Chưa"}
            {" "} (Hạn: {todo.dueDate?.substring(0, 10)})
          </li>
        ))}
      </ul>

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Trang trước
      </button>
      <button onClick={() => setPage(page + 1)}>Trang sau</button>
    </div>
  );
}
