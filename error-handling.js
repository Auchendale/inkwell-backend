exports.pageNotFound = (request, response, next) => {
  response.status(404).send({ message: "not found" });
};

exports.serverErrorHandling = (error, request, response, next) => {
  response.status(500).send({ message: "internal server error" });
};

exports.customErrorHandling = (error, request, response, next) => {
  if (error.status && error.message) {
    response.status(error.status).send({ message: error.message });
  } else next(error);
};
