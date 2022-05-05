const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CpuUsageSchema = new Schema({
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

module.exports = CpuUsageModel = mongoose.model("cpuusage", CpuUsageSchema);
