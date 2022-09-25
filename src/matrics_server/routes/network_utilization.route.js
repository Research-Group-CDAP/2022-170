const express = require("express");
const router = express.Router();

const { fetch_All_Network_Utilization} = require("../controllers/network_utilization.controller");

router.get("/fetch/fetch_All_Network_Utilization", fetch_All_Network_Utilization);

module.exports = router;
