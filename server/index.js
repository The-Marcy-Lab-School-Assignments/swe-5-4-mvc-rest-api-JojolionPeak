const express = require("express");
const path = require("path");

const app = express();
const pathToFrontend = path.join(__dirname, "../frontend");

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////

// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: "Buy groceries", isDone: false },
  { id: getId(), task: "Walk the dog", isDone: true },
  { id: getId(), task: "Read a book", isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

// TODO: GET /api/todos
// Response: 200, array of all todos
const readToDos = (req, res, next) => {
  res.send(todos);
};

// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id
const readToDoById = (req, res, next) => {
  const { id } = req.params;
  let match = todos.find((todo) => todo.id === Number(id));
  if (!match) {
    res.status(404).send(error.message);
    return;
  }
  res.send(match);
};

// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body
const postToDo = (req, res, next) => {
  const { task } = req.body;
  if (!task) {
    res.status(400).send({ message: "Invalid task name" }); // 400 means "Invalid Request"
    return;
  }
  const newTask = { id: getId(), task: task, isDone: false };
  todos.push(newTask);
  res.status(201).send({ newTask });
};

// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id
const patchToDo = (req, res, next) => {
  const { isDone } = req.body;
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === Number(id));
  todo.isDone = isDone;
  res.send(todo);
};

// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id
const deleteToDo = (req, res, next) => {
  const id = req.params.id;
  const i = todos.findIndex((todo) => todo.id === Number(id));
  todos.splice(i, 1);
  res.sendStatus(204);
};

// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)
app.get("/api/todos/:id", readToDoById);
app.get("/api/todos", readToDos);
app.post("/api/todos", postToDo);
app.patch(`/api/todos/:id`, patchToDo);
app.delete("/api/todos/:id", deleteToDo);

const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
