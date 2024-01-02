const { User, Session } = require("../models");
const { SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");

const checkUserValidity = async (req, res, next) => {
  console.log("check if user session valid...");
  const authorization = req.get("authorization");
  const loggedUser = await Session.findOne({
    where: { token: authorization.substring(7) },
  });
  console.log(loggedUser);
  if (!loggedUser) {
    const error = new Error();
    error.name = "UserError";
    error.message = "invalid credentials!";
    throw error;
  }

  const user = await User.findOne({
    where: {
      id: loggedUser.userId,
    },
  });

  if (user.disabled) {
    return res.status(401).json({
      error: "operation is not permitted, because the account is disabled",
    });
  }

  console.log("User credentials valid!");

  next();
};

module.exports = checkUserValidity;
