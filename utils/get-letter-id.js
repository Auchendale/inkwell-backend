const Letters = require("../models/letters");

const getLetterId = async () => {
  const letters = await Letters.find();
  return letters[0]._id;
};

module.exports = getLetterId;
