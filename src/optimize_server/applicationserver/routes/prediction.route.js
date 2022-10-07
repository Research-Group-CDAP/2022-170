const express = require("express");
const router = express.Router();

const {
  predict_Cpu_Usage,
  predict_Memory_Usage,
  predict_Network_Usage
} = require("../controllers/Prediction.controller");

router.get("/predict_Cpu_Usage", predict_Cpu_Usage);
router.get("/predict_Memory_Usage", predict_Memory_Usage);
router.get("/predict_Network_Usage", predict_Network_Usage);

module.exports = router;
