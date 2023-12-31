const router = require("express").Router();

const { User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({});
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put("/:username", async (req, res) => {
  const updateUser = await User.findOne({
    where: { username: req.params.username },
  });
  updateUser.name = req.body.name;
  await updateUser.save();
  return res.json(updateUser);
});

module.exports = router;
