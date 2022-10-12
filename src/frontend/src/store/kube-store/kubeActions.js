import KubeApi from "../api/kubeApi";
import ActionTypes from "./kubeTypes";

export const fetch_All_Pods_By_Namespace = (namespace) => {
  return {
    type: ActionTypes.GET_POD_DETAILS_BY_NAMESPACE,
    payload: KubeApi.fetch_All_Pods_By_Namespace(namespace),
  };
};

export const fetch_All_Services_By_Namespace = (namespace) => {
  return {
    type: ActionTypes.GET_SERVICES_DETAILS_BY_NAMESPACE,
    payload: KubeApi.fetch_All_Services_By_Namespace(namespace),
  };
};

export const fetch_All_Dependency_By_Namespace = (namespace) => {
  return {
    type: ActionTypes.GET_DEPENDENCY_DETAILS_BY_NAMESPACE,
    payload: KubeApi.fetch_All_Dependency_By_Namespace(namespace),
  };
};

export const clusterConnected = () => {
  return {
    type: ActionTypes.CLUSTER_CONNECTED,
    payload: true,
  };
};

export const clusterNotConnected = () => {
  return {
    type: ActionTypes.CLUSTER_CONNECTED,
    payload: false,
  };
};
