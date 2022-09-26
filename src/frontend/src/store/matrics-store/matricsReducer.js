import ActionTypes from "./matricsTypes";

const initialState = {
	cpuData: [],
	errorCpu: null,
	loading: false,
	error: null,
};

const matricsReducer = (state = initialState, action) => {
	switch (action.type) {
		case `${ActionTypes.GET_CPU_TIME_SERIES_DATA}_PENDING`:
			return { ...state, loading: true };

		case `${ActionTypes.GET_CPU_TIME_SERIES_DATA}_FULFILLED`:
			let cpuData = action.payload.data;
			return { ...state, loading: false, cpuData };

		case `${ActionTypes.GET_CPU_TIME_SERIES_DATA}_REJECTED`:
			return {
				...state,
				loading: false,
				error: action.payload.response.data,
				state: initialState,
			};

		default:
			return state;
	}
};

export default matricsReducer;
