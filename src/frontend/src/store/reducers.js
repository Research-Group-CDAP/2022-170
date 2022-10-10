import { combineReducers } from "redux";
import fastProviderReducer from "./fastprovider-store/fastProviderReducer";
import matricsReducer from "./matrics-store/matricsReducer";
import kubeReducer from "./kube-store/kubeReducer";
import optimizeReducer from "./optimize-store/optimizeReducer";

const reducers = combineReducers({
  matricsReducer,
  fastProviderReducer,
  kubeReducer,
  optimizeReducer
});

export default reducers;
