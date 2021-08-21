const cities = require("../models/stores.json");
const axios = require("axios");
const geolib = require("geolib");

module.exports = async (req, res) => {
  try {
    const targetCities = cities.filter((data) => {
      return data.postcode === req.body.postcode;
    });

    if (targetCities.length !== 0) {
      const newDataSet = cities.filter((data) => {
        return data.postcode !== req.body.postcode;
      });

      let targetLocation = await axios
        .get(`https://api.postcodes.io/postcodes/${targetCities[0].postcode}`)
        .then((result) => {
          return {
            longitude: result.data.result.longitude,
            latitude: result.data.result.latitude,
          };
        })
        .catch((err) => {
          return;
        });

      if (targetLocation !== undefined) {
        let dataPromiseSet = await newDataSet.map((data) => {
          return axios
            .get(`https://api.postcodes.io/postcodes/${data.postcode}`)
            .then((result) => {
              return {
                name: data.name,
                postcode: data.postcode,
                longitude: result.data.result.longitude,
                latitude: result.data.result.latitude,
              };
            });
        });

        let withLocationList = await Promise.allSettled(dataPromiseSet).then(
          (output) => {
            return output;
          }
        );

        let trimmedList = withLocationList.filter((data) => {
          return data.status === "fulfilled";
        });

        let withDistance = trimmedList.filter((data) => {
          const { longitude, latitude } = data.value;
          return (
            geolib.getDistance(targetLocation, {
              longitude: longitude,
              latitude: latitude,
            }) <=
            req.body.radius * 1000
          );
        });

        let orderedList = withDistance.sort((a, b) => {
          return b.value.latitude - a.value.latitude;
        });

        let resultList = orderedList.map(({ value: { name, postcode } }) => {
          return { name, postcode };
        });

        res.status(200).json({
          data: resultList,
          message:
            "We found location list within this radius ordered from north",
        });
      } else {
        res.status(400).json({ message: "You send wrong postcode" });
      }
    } else {
      res
        .status(400)
        .json({ message: "There is no postcode you written in stores" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
