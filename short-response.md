# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

The Todo Tracker API is a RESTful API because it sticks to URL endpoints following an hierarchal structure. such as `app.patch("/api/todos/:id", callback())`. The Todo Tracker also uses the correct methods for each of the endpoints, to correctly identify which kind of request is being made. Finally, the Todo Tracker also uses the correct status codes, to let the client know the status of the response being sent.

---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

When we mix data logic and request/response logic in the same file, we will end up creating a **code monolith** which can be _hard to read and build upon_. Separating our code based off of its purpose allows us to not only _organize our code_ and make it easier to _debug_ any potential errors in our code, but it also allows us to **scale up our code** in future updates to our website. Although separating our functions and data structure becomes easier, the _amount of code that we will have to write becomes larger_.

> A code monolith is a large and typically tightly coupled codebase that contains all the application's components

---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

When a user clicks on the `isDone` field, first, in **frontend/main.js**, the `handleTodosListCLick` listener is going to run and call `updateTodo()`, inputting the id of the task they want to update, and the status of it's completion. Then we go into **frontend/fetch-helper.js** to execute the `updateTodo()` function, which sends a **PATCH request** with the changes made to the todo item in the body of the request, to the _url specified in our server's endpoint_. Next, in **server/index.js**, we turn the body of the request into JSON and run the `updateTodo` controller in the **server/todoControllers.js** file. In the `updateTodo` controller, we use a function imported from the **server/todoModel.js** file, that allows us to _interact with our database_ and change the value of `isDone` for the todo with an id value matching that of the id entered in the route parameter of the URL. Finally, the updated todo is sent back along with the appropriate status code to the client.

---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task)
    return res.status(400).send({ message: "task is required" });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

Lines 1, 2, and 5 should be in the **controller** file because it **directly interacts with data sent by a client** using the page, and also sends a response back to the client. On the other hand, lines 3 and 4 both directly alter the data that the client is requesting, so to avoid having exposed data in our code, we should put those lines in a **model** file.

> Controllers are meant to act as a bridge between the data that users want and the client using the webpage. Controllers can be used to be able to keep the data we want to secure, private and only mutable by the methods of the model.
