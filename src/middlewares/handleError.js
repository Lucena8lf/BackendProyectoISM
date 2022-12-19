module.exports = (error, request, response, next) => {
  //console.log(error);

  if (error.code === "ER_WRONG_VALUE") {
    response.status(200).json({ errMessage: "date used is invalid" });
  } else if (error.code === "ER_SIGNAL_EXCEPTION") {
    response
      .status(200)
      .json({ error: error.code, errMessage: error.sqlMessage });
  } else if (error.code === "ER_DUP_ENTRY") {
    response
      .status(200)
      .json({ errMessage: "Ya se ha registrado en esta clase" });
  } else {
    response.status(500).end();
  }
};
