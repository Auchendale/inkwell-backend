const sendEmail = require("../utils/mailer");

const sendNotificationEmail = async (req, res, next) => {
  const { to, name, recipient } = req.body;
  try {
    await sendEmail(
      to,
      "New Letter on InkWell!",
      `Hi ${recipient}, you have a new letter on InkWell from ${name}.\nOpen the app now to view it!`,
      `<p>Hi, you have a new email on InkWell!.</p>`
    );

    res.status(200).send({ message: "Welcome email sent successfully!" });
  } catch (error) {
    next(error); // Pass the error to your error handler
  }
};

module.exports = { sendNotificationEmail };
