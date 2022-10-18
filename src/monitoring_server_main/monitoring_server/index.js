const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const connectDB = require("./config/db");
const app = express();

const YAML = require('json-to-pretty-yaml');
var path = require("path");
var fs = require("fs");

//Using Cors
app.use(cors());

//Connect Database
connectDB();

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Monitoring Server Running"));

//Define Routes
app.use("/experiment", require("./routes/experiment.route"));

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`Metrics Server started on port ${PORT}`));
