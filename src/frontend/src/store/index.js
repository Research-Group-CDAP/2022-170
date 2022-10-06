import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import reducers from "./reducers";

// Production Store
//const store = createStore(reducers, applyMiddleware(promiseMiddleware));

// Development Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);

export default store;
