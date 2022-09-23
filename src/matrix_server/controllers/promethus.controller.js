const {
  PROMETHEUS_PORT,
  CPU_USAGE,
  MEMORY_UTILIZATION,
  NETWORK_UTILIZATION
} = require("../constants");
const converter = require("json-2-csv");
const axios = require("axios");
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
const Cpu_Usage_Model = require("../models/cpu_usage.model");
const Memory_Utilization_Model = require("../models/memory_utilization.model");
const Network_Utilization_Model = require("../models/network_utilization.model");

app.use(express.static(path.join(__dirname, "public")));

const fetch_Cpu_Usage = async (request, response) => {
  axios
    .get(
      `${PROMETHEUS_PORT}/query?query=${CPU_USAGE}`
    )
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
     
    }).catch((error)=>{
      response.json(error)
    })
};

const fetch_Memory_Utilization= async (request, response) => {
  axios
    .get(
      `${PROMETHEUS_PORT}/query?query=${MEMORY_UTILIZATION}`
    )
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
     
    }).catch((error)=>{
      response.json(error)
    })
};

const fetch_Network_Utilization= async (request, response) => {
  axios
    .get(
      `${PROMETHEUS_PORT}/query?query=${NETWORK_UTILIZATION}`
    )
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
      const metrics_NetworkUtilizationModel = new Network_Utilization_Model({
        metricName: "container_network_receive_bytes_total",
        timestamp: tempTimestamp,
        timeSeriesData: metricArray,
      });

      //Save to Database
      await metrics_NetworkUtilizationModel
      .save()
      .then((createdMetrics) => {
        response.json(createdMetrics);
      })
      .catch((error) => {
        response.json(error);
      });
     
    }).catch((error)=>{
      response.json(error)
    })
};

module.exports = {
  fetch_Cpu_Usage,
  fetch_Memory_Utilization,
  fetch_Network_Utilization
};
