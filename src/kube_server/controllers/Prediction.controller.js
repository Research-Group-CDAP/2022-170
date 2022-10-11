var express = require("express");
var app = express();
const Cpu_Usage_Pred_Model = require("../models/cpu_usage_pred.model");
const Cpu_Usage_Model = require("../models/cpu_usage.model");
const Memory_Usage_Pred_Model = require("../models/memory_utilization_pred.model");
const Memory_Usage_Model = require("../models/memory_utilization.model");
const Network_Usage_Pred_Model = require("../models/network_utilization_pred.model");
const Network_Usage_Model = require("../models/network_utilization.model");

const fetch_All_Predicted_Cpu_Usage_By_Pod = async (request, response) => {
  let timeSeriesDataArray = [];
  Cpu_Usage_Pred_Model.find()
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

const fetch_All_Predicted_Memory_Utilization_By_Pod = async (request, response) => {
  let timeSeriesDataArray = [];
  Memory_Usage_Pred_Model.find()
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

const fetch_All_Predicted_Network_Utilization_By_Pod = async (request, response) => {
  let timeSeriesDataArray = [];
  Network_Usage_Pred_Model.find()
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

const predict_Cpu_Usage = async (request, response) => {
  Cpu_Usage_Model.find()
    .then(async (res) => {
      await res.forEach(async (singleTimestamp, timestampIndex) => {
        await singleTimestamp.timeSeriesData.forEach(async (pod, podIndex) => {
          res[timestampIndex].timeSeriesData[podIndex].value = await predict_pod_metrics(pod.value);
        })
        
        const metrics_CpuUsageModel = new Cpu_Usage_Pred_Model({
          id:singleTimestamp.id,
          metricName: "container_cpu_usage_seconds_total",
          timestamp: singleTimestamp.timestamp,
          timeSeriesData: singleTimestamp.timeSeriesData,
        });
        await metrics_CpuUsageModel.save(res);
      })
      response.json(res);
    })
    .catch((error) => {
      response.json(error);
    });
};

const predict_Memory_Usage = async (request, response) => {
  Memory_Usage_Model.find()
    .then(async (res) => {
      await res.forEach(async (singleTimestamp, timestampIndex) => {
        await singleTimestamp.timeSeriesData.forEach(async (pod, podIndex) => {
          res[timestampIndex].timeSeriesData[podIndex].value = await predict_pod_metrics(pod.value);
        })
        
        const metrics_MemoryUsageModel = new Memory_Usage_Pred_Model({
          id:singleTimestamp.id,
          metricName: "container_memory_working_set_bytes",
          timestamp: singleTimestamp.timestamp,
          timeSeriesData: singleTimestamp.timeSeriesData,
        });
        await metrics_MemoryUsageModel.save(res);
      })
      response.json(res);
    })
    .catch((error) => {
      response.json(error);
    });
};

const predict_Network_Usage = async (request, response) => {
  Network_Usage_Model.find()
    .then(async (res) => {
      await res.forEach(async (singleTimestamp, timestampIndex) => {
        await singleTimestamp.timeSeriesData.forEach(async (pod, podIndex) => {
          res[timestampIndex].timeSeriesData[podIndex].value = await predict_pod_metrics(pod.value);
        })
        
        const metrics_NetworkUsageModel = new Network_Usage_Pred_Model({
          id:singleTimestamp.id,
          metricName: "container_network_receive_bytes_total",
          timestamp: singleTimestamp.timestamp,
          timeSeriesData: singleTimestamp.timeSeriesData,
        });
        await metrics_NetworkUsageModel.save(res);
      })
      response.json(res);
    })
    .catch((error) => {
      response.json(error);
    });
};

const predict_pod_metrics = (pod_value) => {
  let x = 1
  y = Math.random()
  if (y > 0.99) {
    x = -1
  }
  return pod_value * (Math.random()) * 10 * x
}

module.exports = {
  fetch_All_Predicted_Cpu_Usage_By_Pod,
  fetch_All_Predicted_Memory_Utilization_By_Pod,
  fetch_All_Predicted_Network_Utilization_By_Pod,
  predict_Cpu_Usage,
  predict_Memory_Usage,
  predict_Network_Usage
};
