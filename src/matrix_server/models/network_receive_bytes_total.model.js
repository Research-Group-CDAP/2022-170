const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NETWORK_RECEIVE_BYTES_Schema = new Schema({
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

module.exports = NetworkReceiveBytesModel = mongoose.model(
  "networkreceivebytes",
  NETWORK_RECEIVE_BYTES_Schema
);
