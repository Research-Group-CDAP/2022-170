const {
  PROMETHEUS_PORT,
  CPU_CFS_PEROIDS_TOTAL,
  MEMORY_USAGE_BYTES,
  NETWORK_RECEIVE_BYTES_TOTAL
} = require("../constants");
const converter = require("json-2-csv");
const axios = require("axios");
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
const Cpu_Cfs_Periods_Model = require("../models/cpu_cfs_periods_timerange.model");
const MemoryUsageBytesModel = require("../models/memory_usage_bytes_timerange.model");
const NetworkReceiveBytesModel = require("../models/network_receive_bytes_total_timerange.model");

app.use(express.static(path.join(__dirname, "public")));

const fetch_CPU_CFS_PEROIDS_TOTAL = async (request, response) => {
  const { start, end, step } = request.body;
  axios
    .get(
      `${PROMETHEUS_PORT}/query_range?query=${CPU_CFS_PEROIDS_TOTAL}&start=${start}&end=${end}&step=${step}s`
    )
    .then(async (promethusData) => {
      const metricArray = [];
      await promethusData.data.data.result.forEach((element) => {
        let tempTimeSeriesData = {
          podName: "",
          data: [],
        };
        tempTimeSeriesData.podName = element.metric.pod;
        element.values.forEach((responseArray) => {
          let tempData = {
            timestamp: 0,
            value: "",
          };

          tempData.timestamp = responseArray[0];
          tempData.value = responseArray[1];
          tempTimeSeriesData.data.push(tempData);
        });
        metricArray.push(tempTimeSeriesData);
      });

      console.log(metricArray);

      const metrics_Cpu_Cfs_Periods_Model = new Cpu_Cfs_Periods_Model({
        metricName: CPU_CFS_PEROIDS_TOTAL,
        startDateTime: start,
        endDateTime: end,
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
  const { start, end, step } = request.body;
  axios
    .get(
      `${PROMETHEUS_PORT}/query_range?query=${MEMORY_USAGE_BYTES}&start=${start}&end=${end}&step=${step}s`
    )
    .then(async (promethusData) => {
      const metricArray = [];
      await promethusData.data.data.result.forEach((element) => {
        let tempTimeSeriesData = {
          podName: "",
          data: [],
        };
        tempTimeSeriesData.podName = element.metric.pod;
        element.values.forEach((responseArray) => {
          let tempData = {
            timestamp: 0,
            value: "",
          };

          tempData.timestamp = responseArray[0];
          tempData.value = responseArray[1];
          tempTimeSeriesData.data.push(tempData);
        });
        metricArray.push(tempTimeSeriesData);
      });

      console.log(metricArray);

      const metrics_MemoryUsageBytesModel = new MemoryUsageBytesModel({
        metricName: MEMORY_USAGE_BYTES,
        startDateTime: start,
        endDateTime: end,
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
      await converter.json2csv(
        metricArray,
        json2csvCallback
      );

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

const fetch_NETWORK_RECEIVED_BYTES = async (request, response) => {
  const { start, end, step } = request.body;
  axios
    .get(
      `${PROMETHEUS_PORT}/query_range?query=${NETWORK_RECEIVE_BYTES_TOTAL}&start=${start}&end=${end}&step=${step}s`
    )
    .then(async (promethusData) => {
      const metricArray = [];
      await promethusData.data.data.result.forEach((element) => {
        let tempTimeSeriesData = {
          podName: "",
          data: [],
        };
        tempTimeSeriesData.podName = element.metric.pod;
        element.values.forEach((responseArray) => {
          let tempData = {
            timestamp: 0,
            value: "",
          };

          tempData.timestamp = responseArray[0];
          tempData.value = responseArray[1];
          tempTimeSeriesData.data.push(tempData);
        });
        metricArray.push(tempTimeSeriesData);
      });

      console.log(metricArray);

      const metrics_NetworkReceiveBytesModel = new NetworkReceiveBytesModel({
        metricName: NETWORK_RECEIVE_BYTES_TOTAL,
        startDateTime: start,
        endDateTime: end,
        timeSeriesData: metricArray,
      });

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
      await converter.json2csv(
        metricArray,
        json2csvCallback
      );

      await metrics_NetworkReceiveBytesModel
        .save()
        .then((createdMetrics) => {
          response.json(createdMetrics);
        })
        .catch((error) => {
          response.json(error);
        });
    });
};

module.exports = {
  fetch_CPU_CFS_PEROIDS_TOTAL,
  fetch_MEMORY_USAGE_BYTES,
  fetch_NETWORK_RECEIVED_BYTES
};
