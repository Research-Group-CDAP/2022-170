const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CPU_CFS_PERIODS_Time_Range_Schema = new Schema({
  metricName: {
    type: String,
  },
  startDateTime: {
    type: Date,
  },
  endDateTime: {
    type: Date,
  },
  timeSeriesData: [
    {
      podName: {
        type: String,
      },
      data: [
        {
          timestamp: {
            type: Number,
          },
          value: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = CPU_CFS_PERIODS_Time_Range_Model = mongoose.model(
  "cpuusage_timerange",
  CPU_CFS_PERIODS_Time_Range_Schema
);
