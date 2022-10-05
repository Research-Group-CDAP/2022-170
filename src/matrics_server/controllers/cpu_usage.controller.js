const { PROMETHEUS_PORT, CPU_USAGE } = require("../constants");
const axios = require("axios");
var express = require("express");
var app = express();
const Cpu_Usage_Model = require("../models/cpu_usage.model");

const fetch_Cpu_Usage = async (request, response) => {
  axios
    .get(`${PROMETHEUS_PORT}/query?query=${CPU_USAGE}`)
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
      const metrics_CpuUsageModel = new Cpu_Usage_Model({
        metricName: "container_cpu_usage_seconds_total",
        timestamp: tempTimestamp,
        timeSeriesData: metricArray,
      });

      //Save to Database
      await metrics_CpuUsageModel
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

const fetch_All_Cpu_Usage = async (request, response) => {
  Cpu_Usage_Model.find()
    .then((res) => {
      console.log(res);
      response.json(res);
    })
    .catch((error) => {
      response.json(error);
    });
};

const fetch_All_Cpu_Usage_By_Pod = async (request, response) => {
  let timeSeriesDataArray = [];
  Cpu_Usage_Model.find()
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

module.exports = {
  fetch_Cpu_Usage,
  fetch_All_Cpu_Usage,
  fetch_All_Cpu_Usage_By_Pod,
};
