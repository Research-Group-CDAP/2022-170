import KubeApi from "../api/kubeApi";
import ActionTypes from "./kubeTypes";

export const fetch_All_Pods_By_Namespace = (namespace) => {
  return {
    type: ActionTypes.GET_POD_DETAILS_BY_NAMESPACE,
    payload: KubeApi.fetch_All_Pods_By_Namespace(namespace),
  };
};

