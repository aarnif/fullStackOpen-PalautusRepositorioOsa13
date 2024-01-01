const router = require("express").Router();

const ReadingList = require("../models/readingList");

router.post("/", async (req, res) => {
  console.log(req.body);
  const entry = await ReadingList.create(req.body);
  res.json(entry);
});

module.exports = router;
