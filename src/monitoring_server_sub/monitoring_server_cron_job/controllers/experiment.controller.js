const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const YAML = require("json-to-pretty-yaml");
var path = require("path");
var fs = require("fs");
let ExperimentJSON = require("../journal.json");
const ExperimentResults = require("../models/ExperimentResults");

const executeRandomPodExperiment = async (req, res) => {
  exec(`chaos run randompodterm.yaml`, (error, stdout, stderr) => {
    if (error) {
      res.json({ executed: false });
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      res.json({ executed: true });
    }
  });
};

const saveToDatabase = async (req, res) => {
  experimentResults = new ExperimentResults(ExperimentJSON);
  experimentResults
    .save()
    .then((responseExperiment) => {
      res.json(responseExperiment);
    })
    .catch((error) => {
      res.json(error);
    });
};

const fetchAllExperimentResults = async (req, res) => {
  ExperimentResults.find()
    .then((responseExperiment) => {
      res.json(responseExperiment);
    })
    .catch((error) => {
      res.json(error);
    });
};

module.exports = {
  executeRandomPodExperiment,
  saveToDatabase,
  fetchAllExperimentResults,
};
