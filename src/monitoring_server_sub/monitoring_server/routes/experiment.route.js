const express = require("express");
const router = express.Router();

const {
  generateYamlFile,executeExperiment,responseAsJson,saveToDatabase,executeRandomPodExperiment,fetchAllExperimentResults
} = require("../controllers/experiment.controller");

router.post("/generateYamlFile/:podName/:experimentType", generateYamlFile);
router.post("/executeExperiment", executeExperiment);
router.post("/executeRandomPodExperiment", executeRandomPodExperiment);
router.get("/responseAsJson", responseAsJson);
router.post("/saveToDatabase", saveToDatabase);
router.get("/fetchAllExperimentResults/:userId", fetchAllExperimentResults);

module.exports = router;
