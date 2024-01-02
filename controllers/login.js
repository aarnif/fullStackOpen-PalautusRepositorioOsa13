const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const { User, Session } = require("../models");

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "password";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, SECRET);

  const sessionData = {
    userId: user.id,
    token: token,
  };

  const createNewSession = await Session.create(sessionData);

  response
    .status(200)
    .send({ token, name: user.name, username: user.username });
});

module.exports = router;
