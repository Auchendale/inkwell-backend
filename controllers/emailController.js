const sendEmail = require("../utils/mailer");

const sendNotificationEmail = async (req, res, next) => {
  const { to } = req.body;
  try {
    await sendEmail(
      to,
      "Welcome to Inkwell!",
      `Hello, welcome to our app.`,
      `<p>Hello, welcome to our app.</p>`
    );

    res.status(200).send({ message: "Welcome email sent successfully!" });
  } catch (error) {
    next(error); // Pass the error to your error handler
  }
};

module.exports = { sendNotificationEmail };
