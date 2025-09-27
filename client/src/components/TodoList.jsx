import React, { useEffect, useState } from "react";
import api from "../api";

export default function TodoList({ todos, onToggle, onDelete }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Danh sách công việc</h2>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* Nội dung bên trái */}
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                {todo.title}
              </span>
              <span
                className={`text-sm ${
                  todo.status ? "text-green-600" : "text-red-600"
                }`}
              >
                {todo.status ? "✔ Hoàn thành" : "❌ Chưa hoàn thành"}
              </span>
              {/* <span className="text-xs text-gray-500">
                Hạn: {todo.dueDate?.substring(0, 10) || "N/A"}
              </span> */}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onToggle(todo._id, todo.status)}
                className="px-3 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                {todo.status ? "↩" : "✔"}
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          Không có công việc nào ✨
        </p>
      )}
    </div>
  );
}

