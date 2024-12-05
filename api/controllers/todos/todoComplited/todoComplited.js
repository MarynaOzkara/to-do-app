const ctrlWrapper = require("../../../helpers/ctrWrapper");
const HttpError = require("../../../helpers/HttpError");
const Todo = require("../../../models/todo");

const todoComplited = async (req, res) => {
  const { todoId } = req.params;
  const updatadTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      status: "complited",
    },
    { new: true }
  );
  if (!updatadTodo) {
    throw HttpError(404, "Todo not found");
  }
  res.status(200).json({ message: "Todo completed", todo: updatadTodo });
};
module.exports = ctrlWrapper(todoComplited);
