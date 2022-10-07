require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./utils/db.conn");
const { routes } = require("./routes");
const { croneInit } = require("./services/cron");
const bodyParser = require("body-parser");

const app = express();
const port = 9001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Server started");
  connect();
  routes(app);
  croneInit();
});
