import axios from "axios";

const BASE_URL = process.env.REACT_APP_AUTH_API_ENDPOINT;

const requestConfigJson = {
  headers: {
    "x-auth-token": localStorage.getItem("x-auth-token"),
    "Content-type": "application/json",
  },
};

class AuthAPI {
  static registerUser(registerUserData) {
    return axios.post(`${BASE_URL}/user/register`, registerUserData);
  }

  static loginUser(loginUserData) {
    return axios.post(`${BASE_URL}/user/login`, loginUserData);
  }

  static updateUser(updateUserData) {
    return axios.put(
      `${BASE_URL}/user/edit`,
      updateUserData,
      requestConfigJson
    );
  }

  static getUserDetails() {
    return axios.get(`${BASE_URL}/user`, requestConfigJson);
  }

  static logintoCluster(clusterData) {
    return axios.post(
      `${BASE_URL}/user/logintoCluster`,
      clusterData,
      requestConfigJson
    );
  }
}

export default AuthAPI;
