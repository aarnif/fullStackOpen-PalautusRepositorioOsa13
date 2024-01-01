const router = require("express").Router();

const { User, Blog } = require("../models");

const Sequelize = require("sequelize");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [Sequelize.fn("count", Sequelize.col("title")), "blogs"],
      [Sequelize.fn("sum", Sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [["likes", "DESC"]],
  });
  res.json(authors);
});

module.exports = router;
