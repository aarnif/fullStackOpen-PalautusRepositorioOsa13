const router = require("express").Router();

const { Blog } = require("../models");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const deleteBlog = await Blog.destroy({
    where: { id: req.params.id },
  });
  if (deleteBlog === 1) {
    return res.json({ result: `blog with id ${req.params.id} deleted` });
  }
  return res.status(400).json({ error: `invalid id!` });
});

module.exports = router;
