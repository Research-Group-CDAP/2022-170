const express = require("express");
const router = express.Router();

const { fetch_All_Cpu_Usage,fetch_All_Cpu_Usage_By_Pod } = require("../controllers/cpu_usage.controller");

router.get("/fetch/fetch_All_Cpu_Usage", fetch_All_Cpu_Usage);
router.get("/fetch/fetch_All_Cpu_Usage_By_Pod/:podName", fetch_All_Cpu_Usage_By_Pod);

module.exports = router;
