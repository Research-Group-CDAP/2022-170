import ActionTypes from "./optimizeTypes";

const initialState = {
  cpuDataByPod: [],
  memoryDataByPod: [],
  networkDataByPod: [],
  loading: false,
  error: null,
};

const optimizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.GET_PREDICTED_CPU_TIME_SERIES_DATA_BY_POD}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_PREDICTED_MEMORY_TIME_SERIES_DATA_BY_POD}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_PREDICTED_NETWORK_TIME_SERIES_DATA_BY_POD}_PENDING`:
      return { ...state, loading: true };

    case `${ActionTypes.GET_PREDICTED_CPU_TIME_SERIES_DATA_BY_POD}_FULFILLED`:
      let cpuDataByPod = action.payload.data;
      return { ...state, loading: false, cpuDataByPod };
    case `${ActionTypes.GET_PREDICTED_MEMORY_TIME_SERIES_DATA_BY_POD}_FULFILLED`:
      let memoryDataByPod = action.payload.data;
      return { ...state, loading: false, memoryDataByPod };
    case `${ActionTypes.GET_PREDICTED_NETWORK_TIME_SERIES_DATA_BY_POD}_FULFILLED`:
      let networkDataByPod = action.payload.data;
      return { ...state, loading: false, networkDataByPod };

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

export default optimizeReducer;
