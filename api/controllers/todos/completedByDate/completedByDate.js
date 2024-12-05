const ctrlWrapper = require("../../../helpers/ctrWrapper");
const Todo = require("../../../models/todo");

const completedByDate = async (req, res) => {
  const { date } = req.params;
  const completedTodos = await Todo.find({
    status: "complited",
    createdAt: {
      $gte: new Date(`${date}T00:00:00.000Z`),
      $lt: new Date(`${date}T23:59:59.999Z`),
    },
  }).exec();
  res.status(200).json({ completedTodos });
};
module.exports = ctrlWrapper(completedByDate);
