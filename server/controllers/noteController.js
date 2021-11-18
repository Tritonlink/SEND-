let users, notes;
let uids = [];
const events = require("events");
const eventEmitter = new events();
const { readFile, writeFile } = require("fs");
const util = require("util");
const readFilePromise = util.promisify(readFile);
const path = require("path");
const cd = path.resolve(__dirname, "../JSON/note.json");
const cdUser = path.resolve(__dirname, "../JSON/users.json");

(() => {
  readFilePromise(cd, "utf8")
    .then((res) => (notes = JSON.parse(res)))
    .catch((err) => console.log(err));
  readFilePromise(cdUser, "utf8")
    .then((res) => (users = JSON.parse(res)))
    .catch((err) => console.log(err));
})();

eventEmitter.on("get", () => {
  readFilePromise(cd, "utf8")
    .then((res) => (notes = JSON.parse(res)))
    .catch((err) => console.log(err));
  readFilePromise(cdUser, "utf8")
    .then((res) => (users = JSON.parse(res)))
    .catch((err) => console.log(err));
  uids = [];
  users.map((el) => uids.push(el.uid));
});
eventEmitter.on("post", () => {
  writeFile(cd, JSON.stringify(notes), () => {
    readFilePromise(cd, "utf8")
      .then((res) => (notes = JSON.parse(res)))
      .catch((err) => console.log(err));
    readFilePromise(cdUser, "utf8")
      .then((res) => (users = JSON.parse(res)))
      .catch((err) => console.log(err));
    uids = [];
    users.map((element) => uids.push(element.uid));
  });
});

const getNotes = (req, res) => {
  eventEmitter.emit("get");
  const { ID } = req.params;
  if (uids.includes(ID)) res.json(notes.find((el) => el.uid === Number(ID)));
  else res.json({ code: null, data: null });
};

const postNotes = (req, res) => {
  eventEmitter.emit("get");
  const { ID } = req.params;
  const { note } = req.body;
};

const updateNotes = (req, res) => {
  eventEmitter.emit("get");
  const { ID } = req.params;
  const {} = req.body;
};

const deleteNotes = (req, res) => {
  eventEmitter.emit("get");
  const { ID } = req.params;
};

const initNotes = (params) => {
  eventEmitter.emit("get");
  notes.push({
    uid: params.id,
    notes: [],
  });
};

module.exports = { getNotes, postNotes, updateNotes, deleteNotes, initNotes };
