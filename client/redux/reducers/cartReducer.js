import * as type from "../types/type";

const initialState = {
    cartItems: [],
  loading: false,
  error: "",
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.CART_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case type.CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };
    case type.CART_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
