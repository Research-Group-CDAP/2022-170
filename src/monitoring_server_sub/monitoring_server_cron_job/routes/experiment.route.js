const express = require("express");
const router = express.Router();

const {
  saveToDatabase,executeRandomPodExperiment,fetchAllExperimentResults
} = require("../controllers/experiment.controller");

router.post("/executeRandomPodExperiment", executeRandomPodExperiment);
router.post("/saveToDatabase", saveToDatabase);
router.get("/fetchAllExperimentResults", fetchAllExperimentResults);

module.exports = router;
