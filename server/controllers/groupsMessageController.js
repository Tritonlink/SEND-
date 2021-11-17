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
let uids,
  groupsuids = [];

eventEmitter.on("get", function () {
  readFilePromise(cd, "utf8")
    .then((res) => (messages = JSON.parse(res)))
    .catch((err) => console.log(err));
  readFilePromise(cdUser, "utf8")
    .then((res) => {
      users = JSON.parse(res);
      uids = [];
      users.map((user) => uids.push(user.uid));
      groupsuids = [];
      groups.map((group) => {
        groupsuids.push(group.uid);
      });
      return uids, users, groupsuids;
    })
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

const postMessage = (req, res) => {
  eventEmitter.emit("get");
  const { groupID, memberID } = req.params;
  const id = Date.now();
  const { text } = req.body;
  if (uids.includes(memberID) && groupsuids.includes(groupID)) {
    const newMesage = {
      authorID: memberID,
      text,
      date: id,
      mID: id,
      type: 1,
    };
    res.json(newMesage);
    eventEmitter.emit("post");
  } else {
    res.json({ code: null, data: null });
  }
};

const initMessages = (params) => {
  eventEmitter.emit("get");
  const { groupTag } = params.groupTag;
  messages.push({
    groupTag,
    messages: [],
  });
  eventEmitter.emit("post");
};

const getMessages = (req, res) => {
  eventEmitter.emit("get");
  const { groupID, ID } = req.params;

  const message = messages.filter((element) => (element.tag = `#${groupID}`));
  if (uids.includes(ID)) {
    res.json(message);
  } else {
    res.json({ code: null, data: null });
  }
};

const logMessages = (req, res) => {
  eventEmitter.emit("get");
  const { groupID } = req.params;
  const { text } = req.body;
  const id = Date.now();
  const message = {
    authorID: null,
    text,
    date: id,
    mID: id,
    type: 0,
  };
  messages.push(message);
  eventEmitter.emit("post");
};

const editMessage = (req, res) => {
  eventEmitter.emit("get");
  let mIDs = [];
  const { ID, groupID, memberID } = req.params;
  const { text } = req.body;
  const { messages: updateMessageArray } = messages.filter(
    (element) => element.groupTag === `#${groupID}`
  );
  messages.map((element) => mIDs.push(element.authorID));
  if (mIDs.includes(Number(memberID))) {
    const news = updateMessageArray.find(
      (element) => element.mID === Number(ID)
    );
    if (updateMessageArray) {
      news.text = text;

      res.json(updateMessageArray);

      eventEmitter.emit("post");
    } else {
      res.status(404).json({ code: null, data: null });
    }
  } else {
    res.json({ code: null, data: null });
  }
};

module.exports = {
  postMessage,
  getMessages,
  editMessage,
  initMessages,
  logMessages,
};
