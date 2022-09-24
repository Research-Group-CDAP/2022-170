const {
    PROMETHEUS_PORT,
    MEMORY_UTILIZATION
  } = require("../constants");
  const axios = require("axios");
  var express = require("express");
  var app = express();
  var path = require("path");
  const Memory_Utilization_Model = require("../models/memory_utilization.model");
  
  app.use(express.static(path.join(__dirname, "public")));
  
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
  
  const fetch_All_Memory_Utilization = async (request, response) => {
    Memory_Utilization_Model.find().then((res)=>{
        console.log(res);
        response.json(res);
    }).catch((error)=>{
        response.json(error);
    })
  };

  module.exports = {
    fetch_Memory_Utilization,
    fetch_All_Memory_Utilization
  };
  