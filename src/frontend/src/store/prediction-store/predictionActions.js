import PredictionApi from "../api/predictionApi";
import ActionTypes from "./predictionTypes";

export const fetch_Predicted_Cpu_Usage_By_Pod = (podName) => {
  return {
    type: ActionTypes.GET_PREDICTED_CPU_TIME_SERIES_DATA_BY_POD,
    payload: PredictionApi.fetch_Predicted_Cpu_Usage_By_Pod(podName),
  };
};

export const fetch_Predicted_Memory_Utilization_By_Pod = (podName) => {
  return {
    type: ActionTypes.GET_PREDICTED_MEMORY_TIME_SERIES_DATA_BY_POD,
    payload: PredictionApi.fetch_Predicted_Memory_Utilization_By_Pod(podName),
  };
};

export const fetch_Predicted_Network_Utilization_By_Pod = (podName) => {
  return {
    type: ActionTypes.GET_PREDICTED_NETWORK_TIME_SERIES_DATA_BY_POD,
    payload: PredictionApi.fetch_Predicted_Network_Utilization_By_Pod(podName),
  };
};
