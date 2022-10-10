import { combineReducers } from "redux";
import fastProviderReducer from "./fastprovider-store/fastProviderReducer";
import matricsReducer from "./matrics-store/matricsReducer";
import kubeReducer from "./kube-store/kubeReducer";
import optimizeReducer from "./optimize-store/optimizeReducer";
import predictionReducer from "./prediction-store/predictionReducer";

const reducers = combineReducers({
  matricsReducer,
  fastProviderReducer,
  kubeReducer,
  optimizeReducer,
  predictionReducer
});

export default reducers;
