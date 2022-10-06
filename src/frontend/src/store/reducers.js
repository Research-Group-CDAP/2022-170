import { combineReducers } from "redux";
import fastProviderReducer from "./fastprovider-store/fastProviderReducer";
import matricsReducer from "./matrics-store/matricsReducer";

const reducers = combineReducers({
  matricsReducer,
  fastProviderReducer,
});

export default reducers;
