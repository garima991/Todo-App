const Todo = require("../models/todo");

function getTodos(req, res) {
  const { _id } = req.user;
  console.log("User : ", req.user);
  Todo.find({user : _id})
    .then((todos) => {
      res.send({
        status: "success",
        message: "List of all the Tasks",
        data: todos,
      });
    })
    .catch((err) => {
      res.send({ message: err });
    });
}

function createTodo(req, res) {
  const user = req.user;
  console.log(req.body, user);
  Todo.create({...req.body, user})
    .then((todo) => {
      res.send({
        status: "success",
        message: "Todo created successfully",
        data: todo,
      });
    })
    .catch((err) => {
      res.status(500).send({ status: "error", message: err });
    });
}

function updateTodo(req, res) {
  const { id, ...rest } = req.body;
  Todo.findByIdAndUpdate(id, rest, { new: true })
    .then((todo) => {
      res.send({
        status: "success",
        message: "Todo updated successfully",
        data: todo,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err});
    });
}

function deleteTodo(req, res) {
  const { id } = req.body;
  Todo.findByIdAndDelete(id)
    .then((todo) => {
      res.send({
        status: "success",
        message: "Todo deleted successfully",
        data: todo
      });
    })
    .catch((err) => {
      res.status(500).send({ status: "error", message: err });
    });
}

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };

