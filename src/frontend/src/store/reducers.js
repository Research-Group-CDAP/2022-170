import { combineReducers } from "redux";
import matricsReducer from "./matrics-store/matricsReducer";

const reducers = combineReducers({
  matricsReducer,
});

export default reducers;
