const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CPU_USAGE_Schema = new Schema({
  metricName: {
    type: String,
  },
  timestamp: {
    type: String,
  },
  timeSeriesData: [
    {
      podName: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
});

module.exports = CPU_USAGE_Model = mongoose.model("cpuusage", CPU_USAGE_Schema);
