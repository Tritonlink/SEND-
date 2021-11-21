let users;
let json;
const { promisify } = require("util");
const { readFile, writeFile } = require("fs");
const readFilePromise = promisify(readFile);
const events = require("events");
const path = require("path");
const { initNotes } = require("./noteController");
const cd = path.resolve(__dirname, "../JSON/users.json");
const eventEmitter = new events();
readFilePromise(cd, "utf8").then((res) => (users = JSON.parse(res)));
eventEmitter.on("getting", async () => {
  await readFilePromise(cd, "utf8")
    .then((res) => {
      return (users = JSON.parse(res));
    })
    .catch((err) => {
      console.log(err);
    });
});
eventEmitter.on("change", async () => {
  json = await JSON.stringify(users);
  await writeFile(cd, json, () => {
    console.log("writed file sheeeeesh");
  });
  await readFilePromise(cd, "utf8")
    .then((res) => {
      return (users = res);
    })
    .catch((err) => {
      console.log(err);
    });
});

const getUser = (req, res) => {
  eventEmitter.emit("getting");
  res.json(users);
};

const createUser = ({ body }, res) => {
  eventEmitter.emit("getting");
  const [{ name, password }, id] = [body, Date.now()];
  const tag = `#${users.length + 1}`;
  console.log(name, password, id);
  if (
    users.filter(({ uid }) => {
      uid === id;
    })
  ) {
    users.push({
      name,
      password,
      uid: id,
      tag,
    });
    const params = {
      id,
    };
    initNotes(params);
    eventEmitter.emit("change");
    res.json(users.filter(({ uid }) => uid === id));
  } else {
    res.status(500).send("user already exist");
  }
};

const getUserByID = ({ params }, res) => {
  const { id } = params;
  res.json(users.find(({ uid }) => uid === Number(id)));
};

module.exports = { getUser, createUser, getUserByID };
