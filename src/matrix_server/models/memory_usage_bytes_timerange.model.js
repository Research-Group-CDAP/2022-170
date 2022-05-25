const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemoryUsageBytesTimeRangeSchema = new Schema({
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

module.exports = MemoryUsageBytesModel = mongoose.model(
  "memoryusagebyte_timerange",
  MemoryUsageBytesTimeRangeSchema
);