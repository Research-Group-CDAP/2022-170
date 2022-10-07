var express = require("express");
var app = express();
const Cpu_Usage_Pred_Model = require("../models/cpu_usage_pred.model");
const Cpu_Usage_Model = require("../models/cpu_usage.model");

const fetch_All_Cpu_Usage = async (request, response) => {
  Cpu_Usage_Model.find()
    .then(async (res) => {
      await res.forEach(async (singleTimestamp, timestampIndex) => {
        await singleTimestamp.timeSeriesData.forEach(async (pod, podIndex) => {
          res[timestampIndex].timeSeriesData[podIndex].value = await predict_pod_metrics(pod.value)
        })
      })
      await Cpu_Usage_Pred_Model.bulkSave(res).then((response) => {
        response.json(response);
      }).catch((error) => {
        response.json(error);
      });
    })
    .catch((error) => {
      response.json(error);
    });
};

const predict_pod_metrics = (pod_value) => {
  let x = 1
  y = Math.random()
  if (y < 0.5) {
    x = -1
  }
  return pod_value * (Math.random() / 10) * x
}

module.exports = {
  fetch_All_Cpu_Usage,
};
