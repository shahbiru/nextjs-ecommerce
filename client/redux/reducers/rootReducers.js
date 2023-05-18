import { combineReducers } from "redux";
import productReducer from "./productReducer";


const rootReducers = combineReducers({
  product: productReducer
});

export default rootReducers;
