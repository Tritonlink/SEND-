const events = require("events");
const eventEmitter = new events();
const path = require("path");
const { readFile, writeFile } = require("fs");
const util = require("util");
const readFilePromise = util.promisify(readFile);
const cd = path.resolve(__dirname, "../JSON/todos.json");
const cdUser = path.resolve(__dirname, "../JSON/users.json");
let uids,
  users,
  todos = [];
readFilePromise(cd, "utf8")
  .then((res) => (todos = JSON.parse(res)))
  .catch((err) => console.log(err));
readFilePromise(cdUser, "utf8")
  .then((res) => {
    users = JSON.parse(res);
    users.map((el) => uids.push(el.uid));
    return users, uids;
  })
  .catch((err) => console.log(err));

eventEmitter.on("get", () => {
  readFilePromise(cd, "utf8")
    .then((res) => (todos = JSON.parse(res)))
    .catch((err) => console.log(err));
  readFilePromise(cdUser, "utf8")
    .then((res) => (users = JSON.parse(res)))
    .catch((err) => console.log(err));
});

eventEmitter.on("post", () => {
  writeFile(cd, JSON.stringify(todos), () => {
    readFilePromise(cd, "utf8")
      .then((res) => (todos = JSON.parse(res)))
      .catch((err) => console.log(err));
    readFilePromise(cdUser, "utf8")
      .then((res) => (users = JSON.parse(res)))
      .catch((err) => console.log(err));
  });
});

const getToDos = (req, res) => {
  const { ID } = req.params;
  eventEmitter.emit("get");
};

const createToDos = (req, res) => {
  const { ID } = req.params;
  eventEmitter.emit("get");
};

const updateToDos = (req, res) => {
  const { ID } = req.params;
  eventEmitter.emit("get");
};

const deleteToDos = (req, res) => {
  const { ID } = req.params;
  eventEmitter.emit("get");
};

const initToDos = (req, res) => {};

module.exports = { getToDos, createToDos, updateToDos, deleteToDos, initToDos };
