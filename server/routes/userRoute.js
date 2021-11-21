const e = require("express");
const router = e();
const {
  getUser,
  createUser,
  getUserByID,
} = require("../controllers/userController");

router.get("/", getUser);
router.get("/:id", getUserByID);
router.post("/", createUser);

module.exports = router;
