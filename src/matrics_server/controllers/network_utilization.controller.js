const { PROMETHEUS_PORT, NETWORK_UTILIZATION } = require("../constants");
const axios = require("axios");
var express = require("express");
var app = express();
const Network_Utilization_Model = require("../models/network_utilization.model");

const converter = require("json-2-csv");
var path = require("path");
var fs = require("fs");

const fetch_Network_Utilization = async (request, response) => {
  axios
    .get(`${PROMETHEUS_PORT}/query?query=${NETWORK_UTILIZATION}`)
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
    })
    .catch((error) => {
      response.json(error);
    });
};

const fetch_All_Network_Utilization = async (request, response) => {
  Network_Utilization_Model.find({ userId: request.params.userId })
    .then((res) => {
      console.log(res);
      response.json(res);
    })
    .catch((error) => {
      response.json(error);
    });
};

const fetch_All_Network_Utilization_By_Pod = async (request, response) => {
  let timeSeriesDataArray = [];
  Network_Utilization_Model.find({ userId: request.params.userId })
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

const exportToCSV = async (request, response) => {
  let timeSeriesDataArray = [];
  Network_Utilization_Model.find()
    .then(async (res) => {
      await res.forEach((matricData) => {
        let podData = {
          timestamp: 0,
          value: 0,
        };

        podData.timestamp = matricData.timestamp;

        let podDetails = matricData.timeSeriesData.filter(function (pod) {
          let myTextArray = pod.podName.split("-");
          let tempPodName = myTextArray[0] + "-" + myTextArray[1];
          return request.params.podName.includes(tempPodName);
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
        console.log("pathname", __dirname);
        var savePath =
          __dirname + "/../../optimize_server/app/util/datasets/NETWORK/";
        var stream = fs.createWriteStream(savePath + file_name + ".csv");
        stream.once("open", function () {
          stream.write(file_content);
          stream.end();
        });
      };
      await converter.json2csv(timeSeriesDataArray, json2csvCallback);

      await console.log("CSV Generateed");
      await console.log(timeSeriesDataArray);
      await axios
        .get(
          "http://127.0.0.1:8000/model-prdiction-network/make-prediction_singlepod?pod_name=" +
            request.params.podName
        )
        .then(async (res) => {
          let tempArray = [];
          await res.data.res.forEach((singleValue) => {
            tempArray.push(singleValue[0]);
          });
          await response.json(tempArray);
        })
        .catch((error) => {
          response.json(error);
        });
    })
    .catch((error) => {
      response.json(error);
    });
};

module.exports = {
  fetch_Network_Utilization,
  fetch_All_Network_Utilization,
  fetch_All_Network_Utilization_By_Pod,
  exportToCSV,
};
