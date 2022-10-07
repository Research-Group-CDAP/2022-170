import ActionTypes from "./fastProviderTypes";

const initialState = {
  serviceRegisterInfo: {},
  services: [],
  service: {},
  releaseInfo: {},
  error: null,
};

const fastProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.REGISTER_SERVICE}_PENDING`:
    case `${ActionTypes.GET_SERVICES}_PENDING`:
    case `${ActionTypes.GET_SERVICE_BY_ID}_PENDING`:
    case `${ActionTypes.ADD_RELEASE}_PENDING`:
      return { ...state, loading: true, error: null };

    case `${ActionTypes.REGISTER_SERVICE}_FULFILLED`:
      let serviceRegisterInfo = action.payload.data;
      return { ...state, loading: false, serviceRegisterInfo };
    case `${ActionTypes.GET_SERVICES}_FULFILLED`:
      let services = action.payload.data;
      return { ...state, loading: false, services };
    case `${ActionTypes.GET_SERVICE_BY_ID}_FULFILLED`:
      let service = action.payload.data;
      return { ...state, loading: false, service };
    case `${ActionTypes.ADD_RELEASE}_FULFILLED`:
      let releaseInfo = action.payload.data;
      return { ...state, loading: false, releaseInfo };

    case `${ActionTypes.REGISTER_SERVICE}_REJECTED`:
    case `${ActionTypes.GET_SERVICES}_REJECTED`:
    case `${ActionTypes.GET_SERVICE_BY_ID}_REJECTED`:
    case `${ActionTypes.ADD_RELEASE}_REJECTED`:
      return { ...state, loading: false, error: action.payload.response, state: initialState };

    default:
      return state;
  }
};

export default fastProviderReducer;
