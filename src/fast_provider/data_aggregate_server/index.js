require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");

const port = 9001;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res, next) => {
  res.send("<h2>Fast Provider Data Aggregator Server</h2>");
  next();
});

app.listen(port, () => {
  console.log("Data aggregator service start on port 9001");
  connect();
});
