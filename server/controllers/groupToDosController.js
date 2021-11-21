let todos,
  uids,
  usersTod,
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

eventEmitter.on("get", () => {});

eventEmitter.on("post", () => {});

const initToDos = (req, res) => {};

const getToDos = (req, res) => {};

const createToDos = (req, res) => {};

const updtateToDos = (req, res) => {};

const deleteToDos = (req, res) => {};

module.exports = {
  initToDos,
  getToDos,
  createToDos,
  updtateToDos,
  deleteToDos,
};
