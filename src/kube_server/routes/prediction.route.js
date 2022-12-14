const express = require("express");
const router = express.Router();

const {
  fetch_All_Predicted_Cpu_Usage_By_Pod,
  fetch_All_Predicted_Memory_Utilization_By_Pod,
  fetch_All_Predicted_Network_Utilization_By_Pod,
  predict_Cpu_Usage,
  predict_Memory_Usage,
  predict_Network_Usage
} = require("../controllers/Prediction.controller");

router.get("/predict_Cpu_Usage", predict_Cpu_Usage);
router.get("/predict_Memory_Usage", predict_Memory_Usage);
router.get("/predict_Network_Usage", predict_Network_Usage);
router.get("/fetch/fetch_All_Predicted_Cpu_Usage_By_Pod/:podName", fetch_All_Predicted_Cpu_Usage_By_Pod);
router.get("/fetch/fetch_All_Predicted_Memory_Utilization_By_Pod/:podName", fetch_All_Predicted_Memory_Utilization_By_Pod);
router.get("/fetch/fetch_All_Predicted_Network_Utilization_By_Pod/:podName", fetch_All_Predicted_Network_Utilization_By_Pod);


module.exports = router;
