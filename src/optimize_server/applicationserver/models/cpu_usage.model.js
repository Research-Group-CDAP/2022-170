const mongoose = require("mongoose");
const Schema = mongoose.Schema;

<<<<<<< HEAD:src/matrics_server/models/memory_utilization.model.js
const Memory_Utilization_Schema = new Schema({
=======
const CPU_USAGE_Schema = new Schema({
>>>>>>> eb0f714c9b08e42f54338f68040db69c75db3f31:src/optimize_server/applicationserver/models/cpu_usage.model.js
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

<<<<<<< HEAD:src/matrics_server/models/memory_utilization.model.js
module.exports = Memory_Utilization_Model = mongoose.model(
  "memory_utilization",
  Memory_Utilization_Schema
);
=======
module.exports = CPU_USAGE_Model = mongoose.model("cpuusage", CPU_USAGE_Schema);
>>>>>>> eb0f714c9b08e42f54338f68040db69c75db3f31:src/optimize_server/applicationserver/models/cpu_usage.model.js
