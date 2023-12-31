const router = require("express").Router();

const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res, next) => {
  const blog = await Blog.create(req.body);
  return res.json(blog);
});

router.delete("/:id", blogFinder, async (req, res) => {
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
