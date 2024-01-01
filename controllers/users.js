const router = require("express").Router();

const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
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

router.get("/:id", async (req, res) => {
  const findUser = await User.findOne({
    where: { id: req.params.id },
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      through: {
        attributes: [],
      },
    },
  });
  res.json(findUser);
});

module.exports = router;
