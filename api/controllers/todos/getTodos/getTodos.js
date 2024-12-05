const ctrlWrapper = require("../../../helpers/ctrWrapper");
const HttpError = require("../../../helpers/HttpError");
const User = require("../../../models/user");

const getTodos = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("todos");
  if (!user) {
    throw HttpError(404, "User not found");
  }
  res.status(200).json({ todos: user.todos });
};
module.exports = ctrlWrapper(getTodos);
