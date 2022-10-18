const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExperimentResultsSchema = new Schema(
  {
    "chaoslib-version": {
      type: String,
    },
    platform: {
      type: String,
    },
    node: {
      type: String,
    },
    experiment: {
      version: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      tags: {
        type: [String],
      },
      "steady-state-hypothesis": {
        title: {
          type: String,
        },
        probes: {
          type: [mongoose.Mixed],
        },
      },
      method: {
        type: [mongoose.Mixed],
      },
      dry: {
        type: mongoose.Mixed,
      },
    },
    start: {
      type: Date,
    },
    status: {
      type: String,
    },
    deviated: {
      type: Boolean,
    },
    steady_states: {
      before: {
        steady_state_met: {
          type: Boolean,
        },
        probes: {
          type: [mongoose.Mixed],
        },
      },
      after: {
        steady_state_met: {
          type: Boolean,
        },
        probes: {
          type: [mongoose.Mixed],
        },
      },
      during: {
        type: Array,
      },
    },
    run: {
      type: [mongoose.Mixed],
    },
    rollbacks: {
      type: Array,
    },
    end: {
      type: Date,
    },
    duration: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = ExperimentResults = mongoose.model("ExperimentResults", ExperimentResultsSchema);
