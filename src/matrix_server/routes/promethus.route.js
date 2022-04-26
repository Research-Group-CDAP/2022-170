const express = require("express");
const router = express.Router();

const { fetchPromethusData } = require("../controllers/promethus.controller");

router.get("/fetch", fetchPromethusData);

module.exports = router;
