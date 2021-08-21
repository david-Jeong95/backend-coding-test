const cities = require("../models/stores.json");

module.exports = async (req, res) => {
  try {
    res.status(200).json({ cities });
  } catch (err) {
    console.error(err);
    res.status(404).json({ messgae: err });
  }
};
