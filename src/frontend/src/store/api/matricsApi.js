import axios from "axios";

const BASE_URL = process.env.REACT_APP_MATRICS_API_ENDPOINT;

class MatricsAPI {
  static fetch_All_Cpu_Usage(userId) {
    return axios.get(`${BASE_URL}/cpu/fetch/fetch_All_Cpu_Usage/${userId}`);
  }
  static fetch_All_Cpu_Usage_By_Pod(podName, userId) {
    return axios.get(
      `${BASE_URL}/cpu/fetch/fetch_All_Cpu_Usage_By_Pod/${podName}/${userId}`
    );
  }
  static fetch_All_Memory_Utilization(userId) {
    return axios.get(
      `${BASE_URL}/memory/fetch/fetch_All_Memory_Utilization/${userId}`
    );
  }
  static fetch_All_Memory_Utilization_By_Pod(podName, userId) {
    return axios.get(
      `${BASE_URL}/memory/fetch/fetch_All_Memory_Utilization_By_Pod/${podName}/${userId}`
    );
  }
  static fetch_All_Network_Utilization(userId) {
    return axios.get(
      `${BASE_URL}/network/fetch/fetch_All_Network_Utilization/${userId}`
    );
  }
  static fetch_All_Network_Utilization_By_Pod(podName, userId) {
    return axios.get(
      `${BASE_URL}/network/fetch/fetch_All_Network_Utilization_By_Pod/${podName}/${userId}`
    );
  }
  static fetch_Cpu_Usage_Promethues(userId) {
    return axios.post(`${BASE_URL}/prometheus/fetch/fetch_Cpu_Usage/${userId}`);
  }
  static fetch_Memory_Utilization_Promethues(userId) {
    return axios.post(
      `${BASE_URL}/prometheus/fetch/fetch_Memory_Utilization/${userId}`
    );
  }
  static fetch_Network_Utilization_Promethues(userId) {
    return axios.post(
      `${BASE_URL}/prometheus/fetch/fetch_Network_Utilization/${userId}`
    );
  }
}

export default MatricsAPI;
