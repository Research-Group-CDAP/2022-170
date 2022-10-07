const express = require("express");
const router = express.Router();

const {
  predict_Cpu_Usage,
} = require("../controllers/Prediction.controller");

router.get("/predict_Cpu_Usage", predict_Cpu_Usage);

module.exports = router;
