const express = require("express");
const router = express.Router();

const {
  saveToDatabase,executeRandomPodExperiment
} = require("../controllers/experiment.controller");

router.post("/executeRandomPodExperiment", executeRandomPodExperiment);
router.post("/saveToDatabase", saveToDatabase);

module.exports = router;
