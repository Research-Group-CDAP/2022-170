const express = require("express");
const router = express.Router();

const { fetch_All_Memory_Utilization} = require("../controllers/memory_utilization.controller");

router.get("/fetch/fetch_All_Memory_Utilization", fetch_All_Memory_Utilization);

module.exports = router;
