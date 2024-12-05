const ctrlWrapper = require("../../../helpers/ctrWrapper");
const Todo = require("../../../models/todo");

const count = async (req, res) => {
  const totalCompletedTodos = await Todo.countDocuments({
    status: "complited",
  }).exec();
  const totalPendingTodos = await Todo.countDocuments({
    status: "pending",
  }).exec();
  res
    .status(200)
    .json({ completed: totalCompletedTodos, pending: totalPendingTodos });
};
module.exports = ctrlWrapper(count);
