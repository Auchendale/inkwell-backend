const mongoose = require("mongoose");
const database = require("../index");

const letterSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  content: { type: Object, required: true },
  date_sent: { type: Date, default: Date.now },
  is_opened: { type: Boolean, default: false },
  is_saved: { type: Boolean, default: false },
  cosmetics: { type: Object },
});

const Letter = mongoose.model("Letter", letterSchema);

const postLetter = async () => {
  const data = new Letter({
    sender: "Kev",
    recipient: "Kev",
    content: {},
  });
  try {
    await data.save();
  } catch (error) {
    console.log(error);
  }
};

postLetter();

module.exports = Letter;
