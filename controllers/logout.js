const router = require("express").Router();

const { Session } = require("../models");

router.delete("/", async (req, res) => {
  const deleteSessions = await Session.truncate();
  res.json({ result: "logout successfull!" });
});

module.exports = router;
