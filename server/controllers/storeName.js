const cities = require("../models/stores.json");

module.exports = async (req, res) => {
  try {
    const targetCities = cities.filter((data) => {
      return data.name === req.body.name;
    });

    if (targetCities.length !== 0) {
      res
        .status(200)
        .json({ data: targetCities[0], message: "Found the Data!!" });
    } else {
      res.status(404).json({ message: "That Nmae has No Data" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
};
