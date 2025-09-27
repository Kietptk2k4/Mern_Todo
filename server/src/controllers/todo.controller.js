import Todo from "../models/todo.model.js";

// CREATE
export const createTodo = async (req, res) => {
  try {
    const { title, status, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const todo = await Todo.create({ title, status, dueDate });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ (with filter + pagination)
// READ (with filter + pagination)
export const getTodos = async (req, res) => {
  try {
    const { status, from, to, page = 1, limit = 5 } = req.query;

    const query = {};

    // Chỉ filter khi có status rõ ràng
    if (status === "true") {
      query.status = true;
    } else if (status === "false") {
      query.status = false;
    }

    // Filter theo ngày tạo
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from);
      if (to) query.createdAt.$lte = new Date(to);
    }

    const skip = (page - 1) * limit;
    const total = await Todo.countDocuments(query);
    const todos = await Todo.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      todos,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// STATS
export const getStats = async (req, res) => {
  try {
    const completed = await Todo.countDocuments({ status: true });
    const pending = await Todo.countDocuments({ status: false });
    res.json({ completed, pending });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
