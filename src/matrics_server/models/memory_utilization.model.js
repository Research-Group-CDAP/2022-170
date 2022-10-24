const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Memory_Utilization_Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
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

module.exports = Memory_Utilization_Model = mongoose.model(
  "memory_utilization",
  Memory_Utilization_Schema
);
