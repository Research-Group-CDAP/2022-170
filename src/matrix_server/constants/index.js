const PROMETHEUS_PORT = "http://localhost:9090/api/v1";
const CPU_CFS_PEROIDS_TOTAL = "container_cpu_cfs_periods_total";
const MEMORY_USAGE_BYTES = "container_memory_usage_bytes";
const NETWORK_RECEIVE_BYTES_TOTAL = "container_network_receive_bytes_total";

module.exports = {
  PROMETHEUS_PORT,
  CPU_CFS_PEROIDS_TOTAL,
  MEMORY_USAGE_BYTES,
  NETWORK_RECEIVE_BYTES_TOTAL
};
