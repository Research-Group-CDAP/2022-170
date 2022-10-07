import MatricsApi from "../api/optimizeApi";
import ActionTypes from "./optimizeTypes";

export const fetch_All_Predicted_Cpu_Usage_By_Pod = (podName) => {
  return {
    type: ActionTypes.GET_PREDICTED_CPU_TIME_SERIES_DATA_BY_POD,
    payload: MatricsApi.fetch_All_Predicted_Cpu_Usage_By_Pod(podName),
  };
};

export const fetch_All_Predicted_Memory_Utilization_By_Pod = (podName) => {
  return {
    type: ActionTypes.GET_PREDICTED_MEMORY_TIME_SERIES_DATA_BY_POD,
    payload: MatricsApi.fetch_All_Predicted_Memory_Utilization_By_Pod(podName),
  };
};

export const fetch_All_Predicted_Network_Utilization_By_Pod = (podName) => {
  return {
    type: ActionTypes.GET_PREDICTED_NETWORK_TIME_SERIES_DATA_BY_POD,
    payload: MatricsApi.fetch_All_Predicted_Network_Utilization_By_Pod(podName),
  };
};
