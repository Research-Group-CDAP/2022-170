const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getUserDetails,
  loginUser,
  registerUser,
  updateUser,
  deleteUserPermenently,
  logintoCluster,
  updatePluginList,
} = require("../controller/User.controller");

router.get("/", auth, getUserDetails);
router.delete("/remove/:userId", auth, deleteUserPermenently);
router.post("/register", registerUser);
router.put("/edit", auth, updateUser);
router.post("/login", loginUser);
router.post("/logintoCluster", logintoCluster);
router.put("/updateplugins", updatePluginList);

module.exports = router;
