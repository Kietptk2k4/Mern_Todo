import axios from "axios";

// Lấy API_BASE từ file .env
const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
