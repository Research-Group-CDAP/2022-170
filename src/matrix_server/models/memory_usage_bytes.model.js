const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemoryUsageBytesSchema = new Schema({
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

module.exports = MemoryUsageBytesModel = mongoose.model(
  "memoryusagebyte",
  MemoryUsageBytesSchema
);
