module.exports = (error, request, response, next) => {
  console.log(error);

  if (error.code === "ER_WRONG_VALUE") {
    response.status(400).send({ error: "date used is invalid" });
  } else if (error.code === "ER_SIGNAL_EXCEPTION") {
    response
      .status(400)
      .send({ error: error.code, errMessage: error.sqlMessage });
  } else {
    response.status(500).end();
  }
};
