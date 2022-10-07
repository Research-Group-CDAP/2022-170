import axios from "axios";

const BASE_URL = process.env.REACT_APP_MATRICS_API_ENDPOINT;

class MatricsAPI {
  static fetch_All_Cpu_Usage() {
    return axios.get(`${BASE_URL}/cpu/fetch/fetch_All_Cpu_Usage`);
  }
  static fetch_All_Cpu_Usage_By_Pod(podName) {
    return axios.get(
      `${BASE_URL}/cpu/fetch/fetch_All_Cpu_Usage_By_Pod/${podName}`
    );
  }
  static fetch_All_Memory_Utilization() {
    return axios.get(`${BASE_URL}/memory/fetch/fetch_All_Memory_Utilization`);
  }
  static fetch_All_Memory_Utilization_By_Pod(podName) {
    return axios.get(
      `${BASE_URL}/memory/fetch/fetch_All_Memory_Utilization_By_Pod/${podName}`
    );
  }
  static fetch_All_Network_Utilization() {
    return axios.get(`${BASE_URL}/network/fetch/fetch_All_Network_Utilization`);
  }
  static fetch_All_Network_Utilization_By_Pod(podName) {
    return axios.get(
      `${BASE_URL}/network/fetch/fetch_All_Network_Utilization_By_Pod/${podName}`
    );
  }
}

export default MatricsAPI;
