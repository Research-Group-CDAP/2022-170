import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

class MatricsAPI {
	static fetch_All_Cpu_Usage(){
		return axios.get(`${BASE_URL}/cpu/fetch/fetch_All_Cpu_Usage`);
	}
}

export default MatricsAPI;
