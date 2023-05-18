import * as type from "../types/type";

const initialState = {
  products: [],
  loading: false,
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case type.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case type.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
