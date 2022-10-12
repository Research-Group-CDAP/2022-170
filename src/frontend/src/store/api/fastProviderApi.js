import axios from "axios";

const BASE_URL = process.env.REACT_APP_FAST_PROVIDER_API_ENDPOINT;

class FastProviderAPI {
  static register_service(serviceData) {
    return axios.post(`${BASE_URL}/service/register`, serviceData);
  }

  static get_services() {
    return axios.get(`${BASE_URL}/service/`);
  }

  static get_service_by_id(serviceId) {
    return axios.get(`${BASE_URL}/service/${serviceId}`);
  }

  static add_release(resleaseInfo) {
    return axios.put(`${BASE_URL}/service/release`, resleaseInfo);
  }

  static retry_release(serviceId) {
    return axios.put(`${BASE_URL}/service/retry/${serviceId}`, {});
  }

  static make_release(serviceId) {
    return axios.put(`${BASE_URL}/deployment/release/${serviceId}`, {});
  }
}

export default FastProviderAPI;
