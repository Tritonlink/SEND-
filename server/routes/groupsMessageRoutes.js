const express = require("express");
const router = express.Router();
const {
  getMessages,
  postMessage,
  editMessage,
} = require("../controllers/groupsMessageController");

router.get("/:ID/:groupID", getMessages);
router.post("/post/groupID/:memberID", postMessage);
router.put("/put/:ID/:groupID/:memberID", editMessage);

module.exports = router;
