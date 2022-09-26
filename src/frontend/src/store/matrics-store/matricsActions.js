import MatricsApi from "../api/matricsApi";

export const fetch_All_Cpu_Usage = () => {
	return {
		type: "GET_CPU_TIME_SERIES_DATA",
		payload: MatricsApi.fetch_All_Cpu_Usage(),
	};
};




