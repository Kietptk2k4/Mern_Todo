import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: Boolean, default: false }, // false = chưa hoàn thành, true = đã hoàn thành
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
