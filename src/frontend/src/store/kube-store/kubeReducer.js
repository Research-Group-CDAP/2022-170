import ActionTypes from "./kubeTypes";

const initialState = {
  podDetailsByNamespace: [],
  servicesDetailsByNamespace: [],
  loading: false,
  error: null,
};

const kubeReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.GET_POD_DETAILS_BY_NAMESPACE}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_SERVICES_DETAILS_BY_NAMESPACE}_PENDING`:
      return { ...state, loading: true };

    case `${ActionTypes.GET_POD_DETAILS_BY_NAMESPACE}_FULFILLED`:
      let podDetailsByNamespace = action.payload.data;
      return { ...state, loading: false, podDetailsByNamespace };
    case `${ActionTypes.GET_SERVICES_DETAILS_BY_NAMESPACE}_FULFILLED`:
      let servicesDetailsByNamespace = action.payload.data;
      return { ...state, loading: false, servicesDetailsByNamespace };

    case `${ActionTypes.GET_POD_DETAILS_BY_NAMESPACE}_REJECTED`:
    case `${ActionTypes.GET_SERVICES_DETAILS_BY_NAMESPACE}_REJECTED`:
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

export default kubeReducer;
