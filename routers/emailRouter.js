const express = require("express");
const { sendNotificationEmail } = require("../controllers/emailController");

const emailRouter = express.Router();

emailRouter.post("/", sendNotificationEmail);

module.exports = emailRouter;
