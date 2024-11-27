const sendEmail = require("../utils/mailer");

const sendNotificationEmail = async (req, res, next) => {
  const { to, name, recipient } = req.body;
  try {
    await sendEmail(
      to,
      "InkWell notification",
      "use html to display text",
      `<div style="background-color: lightgrey; padding: 50px; text-align: center; border-radius: 5px;">
      <img src="https://i.imgur.com/UnHICZ7.png" style="width: 50px; height: auto; margin-bottom: 30px;"/>
      <h1>You've been Inked!</h1>
      <p style="text-size: 20px;"><strong>You have a new letter on InkWell</strong><sup>TM</sup>.</p>
      <img src="https://i.imgur.com/MGOjnZ3.png" style="border-radius: 50%; width: 150px; height: auto; padding: 10px; border: 5px black solid; background-color: white;"/>
      <p style="text-size: 18px;">Hi <strong>${recipient}</strong>,<br/><br/> Check your pigeonholes to find a new letter from <strong>${name}</strong>!<br><br>Open in the app:</p>
      <a href="http://localhost:3000" target="_blank"><button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-top: 10px;">View Letter</button></a>
      </div>`
    );

    res.status(200).send({ message: "Welcome email sent successfully!" });
  } catch (error) {
    next(error); // Pass the error to your error handler
  }
};

module.exports = { sendNotificationEmail };
