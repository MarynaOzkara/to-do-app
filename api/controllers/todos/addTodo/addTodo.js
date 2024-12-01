const ctrlWrapper = require("../../../helpers/ctrWrapper");
const Todo = require("../../../models/todo");
const moment = require("moment");
const User = require("../../../models/user");
const HttpError = require("../../../helpers/HttpError");

const addTodo = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const { title, category } = req.body;
  const newTodo = new Todo({
    title,
    category,
    dueDate: moment().format("DD-MM-YYYY"),
  });
  await newTodo.save();
  const user = await User.findById(userId);
  if (!user) {
    throw HttpError(404, "User not found");
  }
  user?.todos.push(newTodo._id);
  await user.save();
  res.status(200).json({ message: "Todo added successfully", todo: newTodo });
};
module.exports = ctrlWrapper(addTodo);
