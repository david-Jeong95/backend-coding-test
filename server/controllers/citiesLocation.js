const cities = require("../models/stores.json");
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const targetCities = cities.filter((data) => {
      return data.postcode === req.body.postcode;
    });

    if (targetCities.length !== 0) {
      let targetLocation = await axios
        .get(`https://api.postcodes.io/postcodes/${targetCities[0].postcode}`)
        .then((result) => {
          const { longitude, latitude } = result.data.result;
          return { longitude: longitude, latitude: latitude };
        })
        .catch((err) => {
          return;
        });

      if (targetLocation !== undefined) {
        res.status(200).json({
          data: targetLocation,
          message: "Postcode location found",
        });
      } else {
        res.status(403).json({ message: "You send wrong postcode" });
      }
    } else {
      res.status(404).json({ message: "We cannot find postcode you written" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
};
