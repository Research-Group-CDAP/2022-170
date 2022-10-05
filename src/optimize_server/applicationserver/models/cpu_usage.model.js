const mongoose = require("mongoose");
const Schema = mongoose.Schema;

<<<<<<< HEAD:src/optimize_server/applicationserver/models/cpu_usage.model.js
const CPU_USAGE_Schema = new Schema({
=======
const Memory_Utilization_Schema = new Schema({
>>>>>>> 8bb57249481920d690c08ca47090322467a901f5:src/matrics_server/models/memory_utilization.model.js
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

<<<<<<< HEAD:src/optimize_server/applicationserver/models/cpu_usage.model.js
module.exports = CPU_USAGE_Model = mongoose.model("cpuusage", CPU_USAGE_Schema);
=======
module.exports = Memory_Utilization_Model = mongoose.model(
  "memory_utilization",
  Memory_Utilization_Schema
);
>>>>>>> 8bb57249481920d690c08ca47090322467a901f5:src/matrics_server/models/memory_utilization.model.js
