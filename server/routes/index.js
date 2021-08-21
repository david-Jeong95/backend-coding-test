const express = require("express");
const router = express.Router();
const controller = require("../controllers/index")

router.get("/cities", controller.cities);

module.exports = router;