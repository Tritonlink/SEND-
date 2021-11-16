const events = require("events");
let groups, json, users;
let uids = [];
const { readFile, writeFile } = require("fs");
const util = require("util");
const readFilePromise = util.promisify(readFile);
const path = require("path");
const cd = path.resolve(__dirname, "../JSON/groups.json");
const cdUser = path.resolve(__dirname, "../JSON/users.json");
const eventEmitter = new events();
readFilePromise(cd, "utf8")
  .then((res) => {
    json = res;
    groups = JSON.parse(res);
    return json, groups;
  })
  .catch((err) => console.log(err));
readFilePromise(cdUser, "utf8")
  .then((res) => (users = JSON.parse(res)))
  .catch((err) => console.log(err));
eventEmitter.on("get", () => {
  readFilePromise(cd, "utf8")
    .then((res) => {
      groups = JSON.parse(res);
      json = res;
      return groups, json;
    })
    .catch((err) => console.log(err));
  readFilePromise(cdUser, "utf8")
    .then((res) => {
      users = JSON.parse(res);
      uids = [];
      users.map((user) => uids.push(user.uid));
      return uids, users;
    })
    .catch((err) => console.log(err));
});
eventEmitter.on("change", () => {
  json = JSON.stringify(groups);
  writeFile(cd, json, () => {
    console.log("writed file sheeeeeeeeesh");
  });
  readFilePromise(cd, "utf8")
    .then((res) => {
      json = res;
      groups = JSON.parse(res);
      return groups, json;
    })
    .catch((err) => console.log(err));
  readFilePromise(cdUser, "utf8")
    .then((res) => {
      users = JSON.parse(res);
      uids = [];
      users.map((user) => uids.push(user.uid));
      return users, uids;
    })
    .catch((err) => console.log(err));
});

const getGroups = (req, res) => {
  eventEmitter.emit("get");
  res.json(groups);
};

const authentification = (req, res) => {
  eventEmitter.emit("get");
  const { id, memberID } = req.params;
  console.log(groups);
  const group = groups.filter((grp) => {
    return grp.uid === Number(id) && grp.members.includes(Number(memberID));
  });
  console.log(groups);
  res.json(group);
};

const createGroup = ({ body }, res) => {
  eventEmitter.emit("get");
  const { name, members, admin, password } = body;
  const id = Date.now();
  const member = members.filter((mem) => {});
  const tag = `#${groups.length + 1}`;
  groups.push({
    name,
    members: member,
    admin,
    password,
    uid: id,
    tag,
  });
  res.json(
    groups.filter(({ uid }) => {
      return uid === Number(id);
    })
  );
  eventEmitter.emit("change");
};

const admin = (req, res) => {
  eventEmitter.emit("get");
  const { ID, adminID, newAdminID } = req.params;
  const newAdmin = groups.find((grp) => {
    return grp.tag === `#${ID}`;
  });
  console.log(newAdmin, typeof newAdmin);
  const { admin, members } = newAdmin;

  if (admin.includes(Number(adminID)) && members.includes(Number(adminID))) {
    const index = groups.indexOf(newAdmin);
    if (
      !admin.includes(Number(newAdminID)) &&
      members.includes(Number(newAdminID))
    ) {
      admin.push(parseInt(newAdminID));
    }
    groups.splice(index, 1, newAdmin);
    eventEmitter.emit("change");
    res.json({ data: newAdmin, success: true });
  } else if (!members.includes(Number(adminID)) || !members.includes(adminID)) {
    res.json({ success: false, reason: 500 });
  } else {
    res.json({ success: false, reason: 501 });
  }
};

const member = (req, res) => {
  eventEmitter.emit("get");
  const { ID, adminID, newMemberID } = req.params;
  const newMember = groups.find((grp) => {
    return grp.tag === `#${ID}`;
  });
  const { members, admin } = newMember;
  const index = groups.indexOf(newMember);
  if (admin.includes(Number(adminID)) && members.includes(Number(adminID))) {
    if (!members.includes(Number(newMemberID))) {
      members.push(Number(newMemberID));
      res.json({ data: newMember, success: true });
      groups.splice(index, 1, newMember);
      eventEmitter.emit("change");
    } else {
      res.json({ success: false, code: 0 });
    }
  } else if (members.includes(Number(adminID))) {
    res.json({ success: false, code: 500 });
  } else {
    res.json({ success: false, code: 501 });
  }
};

module.exports = { getGroups, authentification, createGroup, admin, member };
