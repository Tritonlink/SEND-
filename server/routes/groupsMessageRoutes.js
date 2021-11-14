const express = require("express");
const {
  getMessagesMember,
  postMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/groupsMessageController");
const router = express.Router();

router.get("/:ID/:memberID", getMessagesMember);
router.post("/:ID/:memberID", postMessage);
router.put("/:ID/:memberID/:messageID", updateMessage);
router.delete("/:ID/:memberID/:messageID", deleteMessage);

module.exports = router;
