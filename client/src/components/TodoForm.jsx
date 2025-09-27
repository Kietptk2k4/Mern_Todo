import { useState } from "react";
import axios from "axios";

export default function TodoForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/todos", {
      title,
      status: false,
      dueDate,
    });
    setTitle("");
    setDueDate("");
    if (onAdded) onAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tên công việc..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">➕ Thêm</button>
    </form>
  );
}
