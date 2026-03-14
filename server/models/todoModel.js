let id = 1;
const getId = () => id++;

// Restrict access to our mock "database" to just this Model file
const todos = [
  { id: getId(), task: "Buy groceries", isDone: false },
  { id: getId(), task: "Walk the dog", isDone: true },
  { id: getId(), task: "Read a book", isDone: false },
];

// Can be used like "fellowModel.create()"
module.exports.create = (name) => {
  const newTask = { id: getId(), name, isDOne: false };
  todos.push(newTask);
  return newTask;
};

module.exports.list = () => {
  return [...todos];
};

module.exports.find = (id) => {
  const task = todos.find((todo) => todo.id === id);
  if (!task) {
    return null;
  }
  return { ...task };
};

module.exports.update = (id, isDone) => {
  const task = todos.find((todo) => todo.id === id);
  if (!task) return null;
  task.isDone = isDone;
  return { ...task };
};

module.exports.destroy = (id) => {
  const taskIndex = todos.findIndex((todo) => todo.id === id);
  if (taskIndex < 0) {
    return false;
  }
  todos.splice(taskIndex, 1);
  return true;
};
