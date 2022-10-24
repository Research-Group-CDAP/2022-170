import MatricsApi from "../api/matricsApi";
import ActionTypes from "./matricsTypes";

export const fetch_All_Cpu_Usage = (userId) => {
  return {
    type: ActionTypes.GET_CPU_TIME_SERIES_DATA,
    payload: MatricsApi.fetch_All_Cpu_Usage(userId),
  };
};

export const fetch_All_Cpu_Usage_By_Pod = (podName, userId) => {
  return {
    type: ActionTypes.GET_CPU_TIME_SERIES_DATA_BY_POD,
    payload: MatricsApi.fetch_All_Cpu_Usage_By_Pod(podName, userId),
  };
};

export const fetch_All_Memory_Utilization = (userId) => {
  return {
    type: ActionTypes.GET_MEMORY_TIME_SERIES_DATA,
    payload: MatricsApi.fetch_All_Memory_Utilization(userId),
  };
};

export const fetch_All_Memory_Utilization_By_Pod = (podName, userId) => {
  return {
    type: ActionTypes.GET_MEMORY_TIME_SERIES_DATA_BY_POD,
    payload: MatricsApi.fetch_All_Memory_Utilization_By_Pod(podName, userId),
  };
};

export const fetch_All_Network_Utilization = (userId) => {
  return {
    type: ActionTypes.GET_NETWORK_TIME_SERIES_DATA,
    payload: MatricsApi.fetch_All_Network_Utilization(userId),
  };
};

export const fetch_All_Network_Utilization_By_Pod = (podName, userId) => {
  return {
    type: ActionTypes.GET_NETWORK_TIME_SERIES_DATA_BY_POD,
    payload: MatricsApi.fetch_All_Network_Utilization_By_Pod(podName, userId),
  };
};
