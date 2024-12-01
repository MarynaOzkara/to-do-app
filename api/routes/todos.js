const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos/index");

router.post("/add/:userId", todosController.addTodo);

module.exports = router;
