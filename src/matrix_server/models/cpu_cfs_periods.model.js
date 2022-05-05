const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CPU_CFS_PERIODS_Schema = new Schema({
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

module.exports = CPU_CFS_PERIODS_Model = mongoose.model(
  "cpucfsperiods",
  CPU_CFS_PERIODS_Schema
);
