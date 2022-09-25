const express = require("express");
const router = express.Router();

const { fetch_All_Cpu_Usage} = require("../controllers/cpu_usage.controller");

router.get("/fetch/fetch_All_Cpu_Usage", fetch_All_Cpu_Usage);

module.exports = router;
