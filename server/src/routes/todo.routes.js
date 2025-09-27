import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getStats,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/stats", getStats);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
