import ActionTypes from "./predictionTypes";

const initialState = {
  predictedCpuDataByPod: [],
  predictedMemoryDataByPod: [],
  predictedNetworkDataByPod: [],
  loading: false,
  error: null,
};

const predictionReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.GET_PREDICTED_CPU_TIME_SERIES_DATA_BY_POD}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_PREDICTED_MEMORY_TIME_SERIES_DATA_BY_POD}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_PREDICTED_NETWORK_TIME_SERIES_DATA_BY_POD}_PENDING`:
      return { ...state, loading: true };

    case `${ActionTypes.GET_PREDICTED_CPU_TIME_SERIES_DATA_BY_POD}_FULFILLED`:
      let predictedCpuDataByPod = action.payload.data;
      return { ...state, loading: false, predictedCpuDataByPod };
    case `${ActionTypes.GET_PREDICTED_MEMORY_TIME_SERIES_DATA_BY_POD}_FULFILLED`:
      let predictedMemoryDataByPod = action.payload.data;
      return { ...state, loading: false, predictedMemoryDataByPod };
    case `${ActionTypes.GET_PREDICTED_NETWORK_TIME_SERIES_DATA_BY_POD}_FULFILLED`:
      let predictedNetworkDataByPod = action.payload.data;
      return { ...state, loading: false, predictedNetworkDataByPod };

    case `${ActionTypes.GET_PREDICTED_CPU_TIME_SERIES_DATA_BY_POD}_REJECTED`:
    case `${ActionTypes.GET_PREDICTED_MEMORY_TIME_SERIES_DATA_BY_POD}_REJECTED`:
    case `${ActionTypes.GET_PREDICTED_NETWORK_TIME_SERIES_DATA_BY_POD}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
        state: initialState,
      };

    default:
      return state;
  }
};

export default predictionReducer;
