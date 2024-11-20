const express = require("express");
const apiRouter = require("./routers/api.router.js");
const {
  pageNotFound,
  serverErrorHandling,
  customErrorHandling,
} = require("./error-handling.js");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", pageNotFound);

app.use(customErrorHandling);

app.use(serverErrorHandling);

module.exports = app;
