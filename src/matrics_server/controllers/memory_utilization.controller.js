const { PROMETHEUS_PORT, MEMORY_UTILIZATION } = require("../constants");
const axios = require("axios");
var express = require("express");
var app = express();
const Memory_Utilization_Model = require("../models/memory_utilization.model");

const converter = require("json-2-csv");
var path = require("path");
var fs = require("fs");

const fetch_Memory_Utilization = async (request, response) => {
  axios
    .get(`${PROMETHEUS_PORT}/query?query=${MEMORY_UTILIZATION}`)
    .then(async (promethusData) => {
      console.log(promethusData.data.data.result);

      //Save to Mongo Database
      const metricArray = [];
      let tempTimestamp = 0;

      await promethusData.data.data.result.forEach(async (element) => {
        let tempTimeSeriesData = {
          podName: "",
          timestamp: "",
          value: "",
        };

        tempTimeSeriesData.podName = element.metric.pod;

        tempTimestamp = element.value[0];
        tempTimeSeriesData.timestamp = element.value[0];
        tempTimeSeriesData.value = element.value[1];

        await metricArray.push(tempTimeSeriesData);
      });

      //Create a Object using Model
      const metrics_MemoryUtilizationModel = new Memory_Utilization_Model({
        metricName: "container_memory_working_set_bytes",
        timestamp: tempTimestamp,
        timeSeriesData: metricArray,
      });

      //Save to Database
      await metrics_MemoryUtilizationModel
        .save()
        .then((createdMetrics) => {
          response.json(createdMetrics);
        })
        .catch((error) => {
          response.json(error);
        });
    })
    .catch((error) => {
      response.json(error);
    });
};

const fetch_All_Memory_Utilization = async (request, response) => {
  Memory_Utilization_Model.find()
    .then((res) => {
      console.log(res);
      response.json(res);
    })
    .catch((error) => {
      response.json(error);
    });
};

const fetch_All_Memory_Utilization_By_Pod = async (request, response) => {
  let timeSeriesDataArray = [];
  Memory_Utilization_Model.find()
    .then(async (res) => {
      await res.forEach((matricData) => {
        let podData = {
          timestamp: 0,
          value: 0,
        };

        podData.timestamp = matricData.timestamp;

        let podDetails = matricData.timeSeriesData.filter(function (pod) {
          return pod.podName == request.params.podName;
        });

        podDetails.forEach((pod) => {
          podData.value = pod.value;

          timeSeriesDataArray.push(podData);
        });
      });
      await response.json(timeSeriesDataArray);
    })
    .catch((error) => {
      response.json(error);
    });
};

const exportToCSV= async (request, response) => {
  let timeSeriesDataArray = [];
  Memory_Utilization_Model.find()
    .then(async (res) => {
      await res.forEach((matricData) => {
        let podData = {
          timestamp: 0,
          value: 0,
        };

        podData.timestamp = matricData.timestamp;

        let podDetails = matricData.timeSeriesData.filter(function (pod) {
          return pod.podName == request.params.podName;
        });

        podDetails.forEach((pod) => {
          podData.value = pod.value;
          timeSeriesDataArray.push(podData);
        });
      });

      let json2csvCallback = function (err, csv) {
        if (err) throw err;
        var file_name = request.params.podName;
        var file_content = csv;
        file_content = file_content.replace(/\n/g, "\r\n");
        console.log("pathname",__dirname);
        var savePath = __dirname + '/../../optimize_server/app/util/datasets/MEMORY/';
        var stream = fs.createWriteStream(savePath + file_name + ".csv");
        stream.once("open", function () {
          stream.write(file_content);
          stream.end();
        });
      };
      await converter.json2csv(
        timeSeriesDataArray,
        json2csvCallback
      );

      await console.log("CSV Generateed");
      await response.json(timeSeriesDataArray);
    })
    .catch((error) => {
      response.json(error);
    });
};

module.exports = {
  fetch_Memory_Utilization,
  fetch_All_Memory_Utilization,
  fetch_All_Memory_Utilization_By_Pod,
  exportToCSV
};
