const todoModel = require("../models/todoModel.js");

// Get All (Read)
module.exports.listTodos = (req, res) => {
  const todosList = todoModel.list();
  res.send(todosList);
};

// Get One (Read)
module.exports.findTodo = (req, res) => {
  const { id } = req.params;
  const todo = todoModel.find(Number(id));

  if (!todo) {
    return res.status(404).send({
      message: `No task with the id ${id}`,
    });
  }
  res.send(todo);
};

// Create
module.exports.createTodo = (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send({ message: "Invalid Task" });
  }

  const newTodo = todoModel.create(task);
  res.send(newTodo);
};

// Update
module.exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  if (!id) {
    return res.status(400).send({ message: "Invalid Task" });
  }

  const updatedTodo = todoModel.update(Number(id), isDone);

  if (!updatedTodo) {
    return res.status(404).send({
      message: `No task with the id ${id}`,
    });
  }

  res.send(updatedTodo);
};

// Delete
module.exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const didDelete = todoModel.destroy(Number(id));

  if (!didDelete) {
    return res.status(404).send({
      message: `No task with the id ${id}`,
    });
  }

  res.sendStatus(204);
};
