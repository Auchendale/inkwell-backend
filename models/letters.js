const mongoose = require("mongoose");
const database = require("../db/connection");

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

module.exports = Letter;
