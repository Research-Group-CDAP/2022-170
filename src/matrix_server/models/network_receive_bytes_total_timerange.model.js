const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NETWORK_RECEIVE_BYTES_Schema = new Schema({
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

module.exports = NetworkReceiveBytesTimeRangeModel = mongoose.model(
  "networkreceivebytes_timerange",
  NETWORK_RECEIVE_BYTES_Schema
);
