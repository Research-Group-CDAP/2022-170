const express = require("express");
const router = express.Router();

const {
  fetch_All_Memory_Utilization,
  fetch_All_Memory_Utilization_By_Pod,
  exportToCSV,
} = require("../controllers/memory_utilization.controller");

router.get("/fetch/fetch_All_Memory_Utilization", fetch_All_Memory_Utilization);
router.get(
  "/fetch/fetch_All_Memory_Utilization_By_Pod/:podName",
  fetch_All_Memory_Utilization_By_Pod
);
router.get("/export/All_Memory_Usage_By_Pod/:podName", exportToCSV);

module.exports = router;
