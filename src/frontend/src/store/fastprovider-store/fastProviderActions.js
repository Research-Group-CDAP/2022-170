import FastProviderApi from "../api/fastProviderApi";
import ActionTypes from "./fastProviderTypes";

export const register_service = (serviceData) => {
  return {
    type: ActionTypes.REGISTER_SERVICE,
    payload: FastProviderApi.register_service(serviceData),
  };
};

export const get_services = (userId) => {
  return {
    type: ActionTypes.GET_SERVICES,
    payload: FastProviderApi.get_services(userId),
  };
};

export const get_service_by_id = (serviceId) => {
  return {
    type: ActionTypes.GET_SERVICE_BY_ID,
    payload: FastProviderApi.get_service_by_id(serviceId),
  };
};

export const add_relese = (releaseInfo) => {
  return {
    type: ActionTypes.ADD_RELEASE,
    payload: FastProviderApi.add_release(releaseInfo),
  };
};

export const retry_release = (serviceId) => {
  return {
    type: ActionTypes.RETRY_RELEASE,
    payload: FastProviderApi.retry_release(serviceId),
  };
};

export const make_release = (serviceId) => {
  return {
    type: ActionTypes.MAKE_RELEASE,
    payload: FastProviderApi.make_release(serviceId),
  };
};
