const express = require("express");
const { sendNotificationEmail } = require("../controllers/email.controllers");

const emailRouter = express.Router();

emailRouter.post("/", sendNotificationEmail);

module.exports = emailRouter;
