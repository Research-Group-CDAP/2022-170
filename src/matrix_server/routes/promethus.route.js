const express = require("express");
const router = express.Router();

const { fetch_CPU_CFS_PEROIDS_TOTAL ,fetch_MEMORY_USAGE_BYTES} = require("../controllers/promethus.controller");

router.get("/fetch/CPU_CFS_PEROIDS", fetch_CPU_CFS_PEROIDS_TOTAL);
router.get("/fetch/MEMORY_USAGE_BYTES", fetch_MEMORY_USAGE_BYTES);

module.exports = router;
