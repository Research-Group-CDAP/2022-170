const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Network_Utilization_Schema = new Schema({
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

module.exports = Network_Utilization_Model = mongoose.model(
  "network_utilization",
  Network_Utilization_Schema
);
