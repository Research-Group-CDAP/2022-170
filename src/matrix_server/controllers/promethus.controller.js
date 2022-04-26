const converter = require("json-2-csv");
const axios = require("axios");
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

const fetchPromethusData = async (request, response) => {
  axios
    .get(
      "http://localhost:9090/api/v1/query?query=container_cpu_cfs_periods_total"
    )
    .then((promethusData) => {
      let json2csvCallback = function (err, csv) {
        if (err) throw err;
        var file_name = "container_cpu_cfs_periods_total";
        var file_content = csv;
        file_content = file_content.replace(/\n/g, "\r\n");
    
        var stream = fs.createWriteStream(file_name+".csv");
        stream.once('open', function () {
            stream.write(file_content);
            stream.end();
        });
      };
      converter.json2csv(promethusData.data.data.result, json2csvCallback);
    });
};

module.exports = {
  fetchPromethusData,
};
