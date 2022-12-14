import ActionTypes from "./authTypes";

const initialState = {
  user: null,
  login: false,
  updated: false,
  clusterConnected: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.LOGIN_USER}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.REGISTER_USER}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.GET_USER_DETAILS}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.LOGIN_CLUSTER}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.UPDATE_USER}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.INSTALL_ISTIO}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.UNINSTALL_ISTIO}_PENDING`:
      return { ...state, loading: true };
    case `${ActionTypes.COFIGURE_PROMETHEUS}_PENDING`:
      return { ...state, loading: true };

    case `${ActionTypes.LOGIN_USER}_FULFILLED`:
      let user = action.payload.data;
      return { ...state, loading: false, login: true, user };
    case `${ActionTypes.REGISTER_USER}_FULFILLED`:
      let registerdUser = action.payload.data;
      return { ...state, loading: false, login: true, user: registerdUser };
    case `${ActionTypes.GET_USER_DETAILS}_FULFILLED`:
      let userData = action.payload.data;
      return { ...state, loading: false, login: true, user: userData };
    case `${ActionTypes.LOGIN_CLUSTER}_FULFILLED`:
      let clusterConnected = action.payload;
      return { ...state, loading: false, login: true, clusterConnected };
    case `${ActionTypes.UPDATE_USER}_FULFILLED`:
      let updatedUserData = action.payload.data;
      return {
        ...state,
        loading: false,
        login: true,
        user: updatedUserData,
        updated: true,
      };
    case `${ActionTypes.INSTALL_ISTIO}_FULFILLED`:
      let updatedUserDataIstio = action.payload.data;
      return {
        ...state,
        loading: false,
        login: true,
        user: updatedUserDataIstio,
        updated: true,
      };
    case `${ActionTypes.UNINSTALL_ISTIO}_FULFILLED`:
      let updatedUninstallUserDataIstio = action.payload.data;
      return {
        ...state,
        loading: false,
        login: true,
        user: updatedUninstallUserDataIstio,
        updated: true,
      };
    case `${ActionTypes.COFIGURE_PROMETHEUS}_FULFILLED`:
      let updatedUserDataPrometheus = action.payload.data;
      return {
        ...state,
        loading: false,
        login: true,
        user: updatedUserDataPrometheus,
        updated: true,
      };

    case `${ActionTypes.LOGIN_USER}_REJECTED`:
    case `${ActionTypes.REGISTER_USER}_REJECTED`:
    case `${ActionTypes.GET_USER_DETAILS}_REJECTED`:
    case `${ActionTypes.LOGIN_CLUSTER}_REJECTED`:
    case `${ActionTypes.UPDATE_USER}_REJECTED`:
    case `${ActionTypes.INSTALL_ISTIO}_REJECTED`:
    case `${ActionTypes.UNINSTALL_ISTIO}_REJECTED`:
    case `${ActionTypes.COFIGURE_PROMETHEUS}_REJECTED`:
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

export default authReducer;
