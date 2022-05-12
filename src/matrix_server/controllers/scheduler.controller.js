const schedule = require('node-schedule');
  const converter = require("json-2-csv");
  const express = require("express");
  const router = express.Router();
  var fs = require("fs");
  const Cpu_Cfs_Periods_Model = require("../models/cpu_cfs_periods.model");
  const MemoryUsageBytesModel = require("../models/memory_usage_bytes.model");

  schedule.scheduleJob('* * * * *', async function(){
    console.log("Started")
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
});