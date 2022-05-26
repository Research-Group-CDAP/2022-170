const {
  PROMETHEUS_PORT,
  CPU_CFS_PEROIDS_TOTAL,
  MEMORY_USAGE_BYTES,
  NETWORK_RECEIVE_BYTES_TOTAL,
} = require("../constants");
const converter = require("json-2-csv");
const axios = require("axios");
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));

const fetch_CPU_CFS_PEROIDS_TOTAL = async (request, response) => {
  axios
    .get(`${PROMETHEUS_PORT}/query?query=${CPU_CFS_PEROIDS_TOTAL}`)
    .then(async (promethusData) => {
      console.log(promethusData.data.data.result);
      let json2csvCallback = function (err, csv) {
        if (err) throw err;
        var file_name = CPU_CFS_PEROIDS_TOTAL;
        var file_content = csv;
        file_content = file_content.replace(/\n/g, "\r\n");

        var stream = fs.createWriteStream(file_name + ".csv");
        stream.once("open", function () {
          stream.write(file_content);
          stream.end();
        });
      };

     await converter.json2csv(promethusData.data.data.result, json2csvCallback);

     await response.json(promethusData.data.data.result);
    });
};

const fetch_MEMORY_USAGE_BYTES = async (request, response) => {
  axios
    .get(`${PROMETHEUS_PORT}/query?query=${MEMORY_USAGE_BYTES}`)
    .then(async (promethusData) => {
      console.log(promethusData.data.data.result);
      let json2csvCallback = function (err, csv) {
        if (err) throw err;
        var file_name = MEMORY_USAGE_BYTES;
        var file_content = csv;
        file_content = file_content.replace(/\n/g, "\r\n");

        var stream = fs.createWriteStream(file_name + ".csv");
        stream.once("open", function () {
          stream.write(file_content);
          stream.end();
        });
      };
      await converter.json2csv(promethusData.data.data.result, json2csvCallback);

      await response.json(promethusData.data.data.result);
    });
};

const fetch_NETWORK_RECEIVED_BYTES = async (request, response) => {
  axios
    .get(`${PROMETHEUS_PORT}/query?query=${NETWORK_RECEIVE_BYTES_TOTAL}`)
    .then(async (promethusData) => {
      console.log(promethusData.data.data.result);
      let json2csvCallback = function (err, csv) {
        if (err) throw err;
        var file_name = NETWORK_RECEIVE_BYTES_TOTAL;
        var file_content = csv;
        file_content = file_content.replace(/\n/g, "\r\n");

        var stream = fs.createWriteStream(file_name + ".csv");
        stream.once("open", function () {
          stream.write(file_content);
          stream.end();
        });
      };
      await converter.json2csv(promethusData.data.data.result, json2csvCallback);

      await response.json(promethusData.data.data.result);
    });
};

module.exports = {
  fetch_CPU_CFS_PEROIDS_TOTAL,
  fetch_MEMORY_USAGE_BYTES,
  fetch_NETWORK_RECEIVED_BYTES,
};
