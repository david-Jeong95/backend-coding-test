const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");

router.get("/cities", controller.cities);

router.get("/citiesLocation", controller.citiesLocation);

router.post("/storeName", controller.storeName);

router.post("/radiusSearch", controller.radiusSearch);

module.exports = router;
