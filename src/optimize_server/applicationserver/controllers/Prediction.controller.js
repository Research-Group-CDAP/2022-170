const { PROMETHEUS_PORT, CPU_USAGE } = require("../constants");
const axios = require("axios");
var express = require("express");
var app = express();
const Cpu_Usage_Model = require("../models/cpu_usage.model");

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
            
          podData.value = predict_pod_metrics(pod.value);

          timeSeriesDataArray.push(podData);
        });
      });
      await response.json(timeSeriesDataArray);
    })
    .catch((error) => {
      response.json(error);
    });
};

const predict_pod_metrics = (pod_value)=>{
    let x = 1
    y = Math.random()
        if(y < 0.5){
            x = -1
        }
    return pod_value * (Math.random()/10) * x
}

module.exports = {
  fetch_All_Cpu_Usage_By_Pod,
};
