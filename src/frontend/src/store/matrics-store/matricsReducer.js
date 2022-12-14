import ActionTypes from "./matricsTypes";

const initialState = {
  cpuData: [],
  cpuDataByPod: [],
  memoryData: [],
  memoryDataByPod: [],
  networkData: [],
  networkDataByPod: [],
  loading: false,
  error: null,
};

const matricsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.GET_CPU_TIME_SERIES_DATA}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_CPU_TIME_SERIES_DATA_BY_POD}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_MEMORY_TIME_SERIES_DATA}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_MEMORY_TIME_SERIES_DATA_BY_POD}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_NETWORK_TIME_SERIES_DATA}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_NETWORK_TIME_SERIES_DATA_BY_POD}_PENDING`:
      return { ...state, loading: true };

    case `${ActionTypes.GET_CPU_TIME_SERIES_DATA}_FULFILLED`:
      let cpuData = action.payload.data;
      return { ...state, loading: false, cpuData };
    case `${ActionTypes.GET_CPU_TIME_SERIES_DATA_BY_POD}_FULFILLED`:
      let cpuDataByPod = action.payload.data;
      return { ...state, loading: false, cpuDataByPod };
    case `${ActionTypes.GET_MEMORY_TIME_SERIES_DATA}_FULFILLED`:
      let memoryData = action.payload.data;
      return { ...state, loading: false, memoryData };
    case `${ActionTypes.GET_MEMORY_TIME_SERIES_DATA_BY_POD}_FULFILLED`:
      let memoryDataByPod = action.payload.data;
      return { ...state, loading: false, memoryDataByPod };
    case `${ActionTypes.GET_NETWORK_TIME_SERIES_DATA}_FULFILLED`:
      let networkData = action.payload.data;
      return { ...state, loading: false, networkData };
    case `${ActionTypes.GET_NETWORK_TIME_SERIES_DATA_BY_POD}_FULFILLED`:
      let networkDataByPod = action.payload.data;
      return { ...state, loading: false, networkDataByPod };

    case `${ActionTypes.GET_CPU_TIME_SERIES_DATA}_REJECTED`:
    case `${ActionTypes.GET_CPU_TIME_SERIES_DATA_BY_POD}_REJECTED`:
    case `${ActionTypes.GET_MEMORY_TIME_SERIES_DATA}_REJECTED`:
    case `${ActionTypes.GET_MEMORY_TIME_SERIES_DATA_BY_POD}_REJECTED`:
    case `${ActionTypes.GET_NETWORK_TIME_SERIES_DATA}_REJECTED`:
    case `${ActionTypes.GET_NETWORK_TIME_SERIES_DATA_BY_POD}_REJECTED`:
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

export default matricsReducer;
