import axios from "axios";

const BASE_URL = process.env.REACT_APP_CLUSTER_API_ENDPOINT;

class clusterAPI {
  static fetchClusterIpsAndLoadbalancer() {
    return axios.post(`${BASE_URL}/services/clusteripsandloadbalancer`);
  }
}

export default clusterAPI;
