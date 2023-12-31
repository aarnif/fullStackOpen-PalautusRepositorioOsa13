const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");

const { Blog, User } = require("../models");
const { SECRET } = require("../util/config");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      console.log(SECRET);
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
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
      title: {
        [Op.iLike]: req.query.search ? `%${req.query.search}%` : `%${""}%`,
      },
    },
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  return res.json(blog);
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
  const deleteBlog = await Blog.destroy({
    where: { id: req.params.id },
  });
  if (deleteBlog === 1) {
    return res.json({ result: `blog with id ${req.params.id} deleted` });
  }
  return res.status(400).json({ error: `invalid id!` });
});

router.put("/:id", blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  return res.json(req.blog);
});

module.exports = router;
