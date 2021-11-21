const express = require("express");
const router = express.Router();

router.get("/:ID");
router.post("/:ID");
router.put("/:ID");
router.delete("/:ID");

module.exports = router;
