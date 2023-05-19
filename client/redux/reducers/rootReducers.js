import { combineReducers } from "redux";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";

const rootReducers = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer
});

export default rootReducers;
