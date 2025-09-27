import React, { useState } from "react";
import api from "../api";

export default function TodoForm({ title, setTitle, onAdd }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd();
      }}
      className="flex gap-3 mb-6"
    >
      <input
        type="text"
        placeholder="Nhập công việc..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-3 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-purple-500 text-white rounded shadow"
      >
        ➕ Thêm
      </button>
    </form>
  );
}