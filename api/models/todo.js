const { Schema, model } = require("mongoose");
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "complited"],
      default: "pending",
    },
    category: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
const Todo = model("Todo", todoSchema);
module.exports = Todo;
