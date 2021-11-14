const express = require("express");
const {
  getGroups,
  authentification,
  createGroup,
  admin,
  member,
} = require("../controllers/groupController");
const router = express.Router();

router.get("/", getGroups);
router.get("/:id/:memberID", authentification);
router.post("/", createGroup);
router.get("/:ID/:adminID/:newAdminID", admin);
router.get("/member/:ID/:adminID/:newMemberID", member);

module.exports = router;
