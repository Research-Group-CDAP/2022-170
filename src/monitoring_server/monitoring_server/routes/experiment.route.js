const express = require("express");
const router = express.Router();

const {
  generateYamlFile,
} = require("../controllers/experiment.controller");

router.get("/generateYamlFile", generateYamlFile);

module.exports = router;
