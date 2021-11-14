const express = require("express");
const router = express();
const {
  getUser,
  createUser,
  getUserByID,
} = require("../controllers/userController");

router.get("/", getUser);
router.get("/:id", getUserByID);
router.post("/", createUser);

module.exports = router;
