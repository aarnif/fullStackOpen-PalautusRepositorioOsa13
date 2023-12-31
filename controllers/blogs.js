const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");

const { Blog, User } = require("../models");
const tokenExtractor = require("../middleware/tokenExtractor");
const checkUserValidity = require("../middleware/checkUserValidity");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  console.log(req.query.search);
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where: {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: req.query.search ? `%${req.query.search}%` : `%${""}%`,
          },
        },
        {
          author: {
            [Op.iLike]: req.query.search ? `%${req.query.search}%` : `%${""}%`,
          },
        },
      ],
    },
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, checkUserValidity, async (req, res, next) => {
  console.log(req.body);
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
  });
  return res.json(blog);
});

router.delete(
  "/:id",
  blogFinder,
  tokenExtractor,
  checkUserValidity,
  async (req, res) => {
    const deleteBlog = await Blog.destroy({
      where: { id: req.params.id },
    });
    if (deleteBlog === 1) {
      return res.json({ result: `blog with id ${req.params.id} deleted` });
    }
    return res.status(400).json({ error: `invalid id!` });
  }
);

router.put("/:id", blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  return res.json(req.blog);
});

module.exports = router;
