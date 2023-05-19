import { combineReducers } from "redux";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

const rootReducers = combineReducers({
  product: productReducer,
  user: userReducer
});

export default rootReducers;
