import axios from "axios";

const BASE_URL = process.env.REACT_APP_KUBE_API_ENDPOINT;

class kubeAPI {
  static fetch_All_Pods_By_Namespace(namespace) {
    return axios.get(`${BASE_URL}/pods/${namespace}`);
  }
}

export default kubeAPI;
