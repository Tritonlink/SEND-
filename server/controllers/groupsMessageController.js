const events = require("events");
const eventEmitter = new events();
const { readFile, writeFile } = require("fs");
const util = require("util");
const readFilePromise = util.promisify(readFile);
const path = require("path");
const cd = path.resolve(__dirname, "../JSON/groupMessage.json");
const cdUser = path.resolve(__dirname, "../JSON/users.json");
const cdGroups = path.resolve(__dirname, "../JSON/groups.json");
let users, groups, messages;
let uids = [];

eventEmitter.on("get", function () {
  readFilePromise(cd, "utf8")
    .then((res) => (messages = JSON.parse(res)))
    .catch((err) => console.log(err));
  readFilePromise(cdUser, "utf8")
    .then((res) => (users = JSON.parse(res)))
    .catch((err) => console.log(err));
  readFilePromise(cdGroups, "utf8")
    .then((res) => (groups = JSON.parse(res)))
    .catch((err) => console.log(err));
});
eventEmitter.emit("post", function () {
  writeFile(cd, JSON.stringify(messages), function () {
    readFilePromise(cd, "utf8")
      .then((res) => (messages = JSON.parse(res)))
      .catch((err) => console.log(err));
  });
});

const postMessage = (req, res) => {};

const getMessages = (req, res) => {};

const editMessage = (req, res) => {};

const deleteMessage = (req, res) => {};

module.exports = { postMessage, getMessages, editMessage, deleteMessage };
