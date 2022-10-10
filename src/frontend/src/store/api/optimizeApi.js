import axios from "axios";

const BASE_URL = process.env.REACT_APP_KUBE_API_ENDPOINT;

class optimizeAPI {
  static fetch_All_Predicted_Cpu_Usage_By_Pod(podName) {
    return axios.get(`${BASE_URL}/prediction/fetch/fetch_All_Predicted_Cpu_Usage_By_Pod/${podName}`);
  }
  static fetch_All_Predicted_Memory_Utilization_By_Pod(podName) {
    return axios.get(`${BASE_URL}/prediction/fetch/fetch_All_Predicted_Memory_Utilization_By_Pod/${podName}`);
  }
  static fetch_All_Predicted_Network_Utilization_By_Pod(podName) {
    return axios.get(`${BASE_URL}/prediction/fetch/fetch_All_Predicted_Network_Utilization_By_Pod/${podName}`);
  }
}

export default optimizeAPI;
