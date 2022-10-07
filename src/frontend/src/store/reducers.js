import { combineReducers } from "redux";
import fastProviderReducer from "./fastprovider-store/fastProviderReducer";
import matricsReducer from "./matrics-store/matricsReducer";
import kubeReducer from "./kube-store/kubeReducer";

const reducers = combineReducers({
  matricsReducer,
  fastProviderReducer,
  kubeReducer
});

export default reducers;
