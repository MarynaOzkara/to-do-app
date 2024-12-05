const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos/index");

router.post("/add/:userId", todosController.addTodo);
router.get("/get/:userId", todosController.getTodos);
router.patch("/:todoId/complete", todosController.todoComplited);
router.get("/completed/:date", todosController.completedByDate);
router.get("/count", todosController.count);

module.exports = router;
