let todos,
  uids,
  usersTodos,
  users,
  groups,
  groupsUids = [];
const events = require("events");
const eventEmitter = new events();
const { readFile, writeFile } = require("fs");
const util = require("util");
const readFilePromise = util.promisify(readFile);
const path = require("path");
const cd = path.resolve(__dirname, "../JSON/groupsTodos.json");
const cdUser = path.resolve(__dirname, "../JSON/users.json");
const cdToDos = path.resolve(__dirname, "../JSON/todos.json");
const cdGroups = path.resolve(__dirname, "../JSON/groups.json");

readFilePromise(cd, "utf8")
  .then((res) => (todos = JSON.parse(res)))
  .catch((err) => console.log(err));
readFilePromise(cdUser, "utf8").then((res) => {
  users = JSON.parse(res);
  users.map((el) => uids.push(el.uid));
});
readFilePromise(cdToDos, "utf8")
  .then((res) => (usersTodos = JSON.parse(res)))
  .catch((err) => console.log(err));
readFilePromise(cdGroups, "utf8").then((res) => {
  groups = JSON.parse(res);
  groups.map((el) => groupsUids.push(el.tag));
});

eventEmitter.on("get", () => {
  readFilePromise(cd, "utf8")
    .then((res) => (todos = JSON.parse(res)))
    .catch((err) => console.log(err));
  readFilePromise(cdUser, "utf8").then((res) => {
    users = JSON.parse(res);
    users.map((el) => uids.push(el.uid));
  });
  readFilePromise(cdToDos, "utf8")
    .then((res) => (usersTodos = JSON.parse(res)))
    .catch((err) => console.log(err));
  readFilePromise(cdGroups, "utf8").then((res) => {
    groups = JSON.parse(res);
    groups.map((el) => groupsUids.push(el.tag));
  });
});

eventEmitter.on("post", () => {
  writeFile(cd, JSON.parse(todos), function () {
    readFilePromise(cd, "utf8")
      .then((res) => (todos = JSON.parse(res)))
      .catch((err) => console.log(err));
    readFilePromise(cdUser, "utf8").then((res) => {
      users = JSON.parse(res);
      users.map((el) => uids.push(el.uid));
    });
    readFilePromise(cdToDos, "utf8")
      .then((res) => (usersTodos = JSON.parse(res)))
      .catch((err) => console.log(err));
    readFilePromise(cdGroups, "utf8").then((res) => {
      groups = JSON.parse(res);
      groups.map((el) => groupsUids.push(el.tag));
    });
  });
  writeFile(cdToDos, JSON.parse(usersTodos), function () {
    readFilePromise(cd, "utf8")
      .then((res) => (todos = JSON.parse(res)))
      .catch((err) => console.log(err));
    readFilePromise(cdUser, "utf8").then((res) => {
      users = JSON.parse(res);
      users.map((el) => uids.push(el.uid));
    });
    readFilePromise(cdToDos, "utf8")
      .then((res) => (usersTodos = JSON.parse(res)))
      .catch((err) => console.log(err));
    readFilePromise(cdGroups, "utf8").then((res) => {
      groups = JSON.parse(res);
      groups.map((el) => groupsUids.push(el.tag));
    });
  });
});

const initToDos = (req, res) => {
  const { ID } = req.params;
  eventEmitter.emit("get");
  const newTodosEspace = {
    from: `#${ID}`,
    type: 1,
    todos: [],
  };
  todos.push(newTodosEspace);
  res.json(newTodosEspace);
};

const getToDos = (req, res) => {
  eventEmitter.emit("get");
  const { ID } = req.params;
  const getTodo = todos.find((el) => el.uid);
  res.json(getTodo);
};

const createToDos = (req, res) => {
  eventEmitter.emit("get");
  const { ID, memberID } = req.params;
  const { object } = req.body;
  const todo = todos.find((el) => el.from === `#${ID}`);
  const index = todos.indexOf(todo);
  const todoTag = todo.todos.length;
  const newTodo = {
    from: `#${memberID}`,
    object,
    todoTag,
  };
  todo.todos.push(newTodo);
  todos[index] = newTodo;
  res.json(todo);
  eventEmitter.emit("post");
};

const updtateToDos = (req, res) => {
  eventEmitter.emit("get");
  const { id, todoTag, memberID } = req.params;
};

const deleteToDos = (req, res) => {};

module.exports = {
  initToDos,
  getToDos,
  createToDos,
  updtateToDos,
  deleteToDos,
};
