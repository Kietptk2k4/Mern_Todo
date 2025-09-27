import { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {
  const [stats, setStats] = useState({ completed: 0, notCompleted: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/api/todos/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div>
      <h2>📊 Thống kê</h2>
      <p>Hoàn thành: {stats.completed}</p>
      <p>Chưa hoàn thành: {stats.notCompleted}</p>
    </div>
  );
}
