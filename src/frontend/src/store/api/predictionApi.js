import axios from "axios";

const BASE_URL = process.env.REACT_APP_MATRICS_API_ENDPOINT;

class PredictionAPI {
  static fetch_Predicted_Cpu_Usage_By_Pod(podName) {
    return axios.get(`${BASE_URL}/cpu/export/All_Cpu_Usage_By_Pod/${podName}`);
  }

  static fetch_Predicted_Network_Utilization_By_Pod(podName) {
    return axios.get(
      `${BASE_URL}/network/export/All_Network_Usage_By_Pod/${podName}`
    );
  }

  static fetch_Predicted_Memory_Utilization_By_Pod(podName) {
    return axios.get(
      `${BASE_URL}/memory/export/All_Memory_Usage_By_Pod/${podName}`
    );
  }
}

export default PredictionAPI;
