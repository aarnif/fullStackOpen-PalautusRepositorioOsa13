const errorHandler = (error, request, response, next) => {
  console.log(error.name);
  console.error(error.message);

  if (error.name === "SequelizeValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "TypeError") {
    return response.status(500).send({ error: error.message });
  }

  next(error);
};

module.exports = errorHandler;
