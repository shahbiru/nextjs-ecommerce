import { createStore, compose, applyMiddleware } from "redux";
// import logger from "redux-logger";
import thunk from "redux-thunk";
// import rootReducers from "./reducers/rootReducers";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const middleWare = [thunk];

const store = createStore(
  // rootReducers,
  composeEnhancers(applyMiddleware(...middleWare))
);

export default store;
