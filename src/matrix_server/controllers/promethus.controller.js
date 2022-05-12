const {
  PROMETHEUS_PORT,
  CPU_CFS_PEROIDS_TOTAL,
  MEMORY_USAGE_BYTES,
} = require("../constants");
const converter = require("json-2-csv");
const axios = require("axios");
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
const Cpu_Cfs_Periods_Model = require("../models/cpu_cfs_periods.model");
const MemoryUsageBytesModel = require("../models/memory_usage_bytes.model");

app.use(express.static(path.join(__dirname, "public")));

const fetch_CPU_CFS_PEROIDS_TOTAL = async (request, response) => {
  const { time, step } = request.body;
  axios
    .get(
      `${PROMETHEUS_PORT}/query_range?query=${CPU_CFS_PEROIDS_TOTAL}&start=${time}&end=${time}&step=${step}s`
    )
    .then(async (promethusData) => {
      const metricArray = [];
      let tempTimestamp = 0;
      await promethusData.data.data.result.forEach((element) => {
        let tempTimeSeriesData = {
          podName: "",
          timestamp: "",
          value: "",
        };
        tempTimeSeriesData.podName = element.metric.pod;
        element.values.forEach((responseArray) => {
          tempTimestamp = responseArray[0];
          tempTimeSeriesData.timestamp = responseArray[0];
          tempTimeSeriesData.value = responseArray[1];
        });
        metricArray.push(tempTimeSeriesData);
      });

      console.log(metricArray);

      const metrics_Cpu_Cfs_Periods_Model = new Cpu_Cfs_Periods_Model({
        metricName: CPU_CFS_PEROIDS_TOTAL,
        timestamp: tempTimestamp,
        timeSeriesData: metricArray,
      });

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

      await converter.json2csv(metricArray, json2csvCallback);

      await metrics_Cpu_Cfs_Periods_Model
        .save()
        .then((createdMetrics) => {
          response.json(createdMetrics);
        })
        .catch((error) => {
          response.json(error);
        });
    });
};

const fetch_MEMORY_USAGE_BYTES = async (request, response) => {
  const { time, step } = request.body;
  axios
    .get(
      `${PROMETHEUS_PORT}/query_range?query=${MEMORY_USAGE_BYTES}&start=${time}&end=${time}&step=${step}s`
    )
    .then(async (promethusData) => {
      const metricArray = [];
      let tempTimestamp = 0;
      await promethusData.data.data.result.forEach((element) => {
        let tempTimeSeriesData = {
          podName: "",
          timestamp: "",
          value: "",
        };
        tempTimeSeriesData.podName = element.metric.pod;
        element.values.forEach((responseArray) => {
          tempTimestamp = responseArray[0];
          tempTimeSeriesData.timestamp = responseArray[0];
          tempTimeSeriesData.value = responseArray[1];
        });
        metricArray.push(tempTimeSeriesData);
      });

      console.log(metricArray);

      const metrics_MemoryUsageBytesModel = new MemoryUsageBytesModel({
        metricName: MEMORY_USAGE_BYTES,
        timestamp: tempTimestamp,
        timeSeriesData: metricArray,
      });

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
      await converter.json2csv(metricArray, json2csvCallback);

      await metrics_MemoryUsageBytesModel
        .save()
        .then((createdMetrics) => {
          response.json(createdMetrics);
        })
        .catch((error) => {
          response.json(error);
        });
    });
};

const exportData = async (request, response) => {
  const memoryUsage = await MemoryUsageBytesModel.findOne({
    timestamp: "1651745070.781",
  });
  const cpuUsage = await Cpu_Cfs_Periods_Model.findOne({
    timestamp: "1651745070.781",
  });

  let metricArray = [];
  await memoryUsage.timeSeriesData.forEach((singleMemoryElement) => {
    let tempObj = {
      pod:null,
      memory: null,
      cpu: null,
    }
    tempObj.pod = singleMemoryElement.podName;
    tempObj.memory = singleMemoryElement.value;
    let tempMemoryElement = cpuUsage.timeSeriesData.find((memoryElement) => {
        return memoryElement.podName == singleMemoryElement.podName;
      });
    if(tempMemoryElement){
      tempObj.cpu = tempMemoryElement.value
    }
    metricArray.push(tempObj);
  });
  let json2csvCallback = function (err, csv) {
    if (err) throw err;
    var file_name = "test";
    var file_content = csv;
    file_content = file_content.replace(/\n/g, "\r\n");

    var stream = fs.createWriteStream(file_name + ".csv");
    stream.once("open", function () {
      stream.write(file_content);
      stream.end();
    });
  };
  await converter.json2csv(metricArray, json2csvCallback);
  console.log(metricArray);
  return response.json(metricArray);
};

module.exports = {
  exportData,
  fetch_CPU_CFS_PEROIDS_TOTAL,
  fetch_MEMORY_USAGE_BYTES,
};
