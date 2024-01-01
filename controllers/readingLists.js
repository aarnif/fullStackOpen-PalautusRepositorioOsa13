const router = require("express").Router();

const { ReadingList, User } = require("../models");
const tokenExtractor = require("../middleware/tokenExtractor");

router.post("/", async (req, res) => {
  console.log(req.body);
  const entry = await ReadingList.create(req.body);
  res.json(entry);
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  console.log(req.body);
  const findListBlog = await ReadingList.findByPk(req.params.id);
  const user = await User.findByPk(req.decodedToken.id);
  if (user.id !== findListBlog.userId) {
    const error = new Error();
    error.name = "UserError";
    error.message = "wrong user!";
    throw error;
  }
  findListBlog.read = req.body.read;
  await findListBlog.save();
  return res.json(findListBlog);
});

module.exports = router;
