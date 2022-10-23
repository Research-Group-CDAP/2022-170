import AuthApi from "../api/authApi.js";
import ActionTypes from "./authTypes";

export const registerUser = (registerUserData) => {
  return {
    type: ActionTypes.REGISTER_USER,
    payload: AuthApi.registerUser(registerUserData),
  };
};

export const loginUser = (loginUserData) => {
  return {
    type: ActionTypes.LOGIN_USER,
    payload: AuthApi.loginUser(loginUserData),
  };
};

export const updateUser = (updateUserData) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: AuthApi.updateUser(updateUserData),
  };
};

export const getUserDetails = () => {
  return {
    type: ActionTypes.GET_USER_DETAILS,
    payload: AuthApi.getUserDetails(),
  };
};

export const logintoCluster = (clusterData) => {
  return {
    type: ActionTypes.LOGIN_CLUSTER,
    payload: clusterData,
  };
};

export const installIstio = (userId) => {
  return {
    type: ActionTypes.INSTALL_ISTIO,
    payload: AuthApi.installIstio(userId),
  };
};

export const uninstallIstio = (userId) => {
  return {
    type: ActionTypes.UNINSTALL_ISTIO,
    payload: AuthApi.uninstallIstio(userId),
  };
};

export const configurePrometheus = (userId) => {
  return {
    type: ActionTypes.COFIGURE_PROMETHEUS,
    payload: AuthApi.configurePrometheus(userId),
  };
};
