import React from "react";   // 🟢 thêm dòng này
import api from "../api";
import { useEffect, useState } from "react";

export default function Stats({ completed, pending }) {
  return (
    <div className="flex justify-around mb-6 text-lg">
      <span className="text-green-600 font-semibold">✔ Hoàn thành: {completed}</span>
      <span className="text-red-600 font-semibold">⏳ Chưa xong: {pending}</span>
    </div>
  );
}
