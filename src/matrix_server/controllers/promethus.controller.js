const { CPU_CFS_PEROIDS_TOTAL, MEMORY_USAGE_BYTES } = require("../constants");
const converter = require("json-2-csv");
const axios = require("axios");
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));

const fetch_CPU_CFS_PEROIDS_TOTAL = async (request, response) => {
  axios
    .get(`http://localhost:9090/api/v1/query?query=${CPU_CFS_PEROIDS_TOTAL}`)
    .then(async (promethusData) => {
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
      await converter.json2csv(
        promethusData.data.data.result,
        json2csvCallback
      );

      await response.json("CSV Generateed");
    });
};

const fetch_MEMORY_USAGE_BYTES = async (request, response) => {
  axios
    .get(`http://localhost:9090/api/v1/query?query=${MEMORY_USAGE_BYTES}`)
    .then(async (promethusData) => {
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
      await converter.json2csv(
        promethusData.data.data.result,
        json2csvCallback
      );

      await response.json("CSV Generateed");
    });
};

module.exports = {
  fetch_CPU_CFS_PEROIDS_TOTAL,
  fetch_MEMORY_USAGE_BYTES
};
