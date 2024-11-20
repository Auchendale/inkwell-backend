const { mongoose } = require("mongoose");
const Letters = require("../models/letters.js");
const ObjectId = require("mongoose").Types.ObjectId;

const getLetterByLetterID = async (request, response, next) => {
  const { letter_id } = request.params;
  if (letter_id.length !== 24) {
    response.status(400).send({ message: "bad request" });
  } else {
    const id = new ObjectId(letter_id);
    const letter = await Letters.findById(id);
    if (!letter)
      response.status(404).send({ message: "letter does not exist" });
    else response.status(200).send({ letter });
  }
};

module.exports = { getLetterByLetterID };
