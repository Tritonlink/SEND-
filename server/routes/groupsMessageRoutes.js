const express = require("express");
const router = express.Router();

router.get("/:ID/:groupID", (req, res) => {
  res.send("get request");
});
router.post("/post/:ID/groupID/:memberID", (req, res) => {
  res.send("post request");
});
router.put("/put/:ID/:groupID/:memberID", (req, res) => {
  res.send("put request");
});
router.delete("/:ID/:groupID/:memberID", (req, res) => {
  res.send("delete request");
});

module.exports = router;
