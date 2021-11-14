const events = require("events");
const eventEmitter = new events();
let json, groupMessage, users, groups;
const { readFile, writeFile } = require("fs");
const util = require("util");
const readFilePromise = util.promisify(readFile);
const path = require("path");
const cd = path.resolve(__dirname, "../JSON/groupMessage.json");
const cdUser = path.resolve(__dirname, "../JSON/users.json");
const cdGroup = path.resolve(__dirname, "../JSON/groups.json");
readFilePromise(cdUser, "utf8")
  .then((res) => (users = JSON.parse(res)))
  .catch((err) => console.log(err));
readFilePromise(cdGroup, "utf8")
  .then((res) => (groups = JSON.parse(res)))
  .catch((err) => console.log(err));
readFilePromise(cd, "utf8").then((res) => {
  json = res;
  groupMessage = JSON.parse(res);
  return json, groupMessage;
});
eventEmitter.on("get", function () {
  readFilePromise(cd, "utf8")
    .then((res) => {
      json = res;
      groupMessage = JSON.parse(res);
      return json, groupMessage;
    })
    .catch((err) => console.log(err));
  readFilePromise(cdUser, "utf8")
    .then((res) => (users = JSON.parse(res)))
    .catch((err) => console.log(err));
  readFilePromise(cdGroup, "utf8")
    .then((res) => (groups = JSON.parse(res)))
    .catch((err) => console.log(err));
});
eventEmitter.on("post", function () {
  json = JSON.stringify(groupMessage);
  writeFile(cd, json, function () {
    readFilePromise(cd, "utf8")
      .then((res) => {
        json = res;
        groupMessage = JSON.parse(res);
      })
      .catch((err) => console.log(err));
  });
});

const getMessagesByID = (req, res) => {
  eventEmitter.emit("get");
  const { ID } = req.params;
  const mess = groupMessage.find((mes) => mes.tag === `#${ID}`);
  res.json(mess);
};

const getMessagesMember = (req, res) => {
  function verif({ tag }) {
    if (tag === `#${ID}`) return true;
    else return false;
  }
  const { ID, memberID } = req.params;
  if (memberID) {
    eventEmitter.emit("get");
    const mess = groupMessage.find(verif);
    res.json(mess);
  } else {
    res.json({ success: false, data: null });
  }
};

const postMessage = (req, res) => {};
const updateMessage = (req, res) => {};
const deleteMessage = (req, res) => {};

module.exports = {
  getMessagesByID,
  getMessagesMember,
  postMessage,
  updateMessage,
  deleteMessage,
};
