import { addCartItem, getCartItem } from 'utils/api';
import * as type from "../types/type"
import { toast } from "react-toastify";


// Action creators
export const addCartRequest = () => ({
  type: type.CART_ITEMS_REQUEST
});

export const addCartSuccess = (products) => ({
  type: type.CART_ITEMS_SUCCESS,
  payload: products
});

export const addCartFailure = (error) => ({
  type: type.CART_ITEMS_FAILURE,
  payload: error
});

// Thunk action creator
export const addToCart = (data) => {
  return (dispatch) => {
    dispatch(addCartRequest());
    addCartItem(data)
      .then((response) => {
        dispatch(addCartSuccess(response?.data));
        if (response.status === 200) {
          toast.success("Product added to card")
        }
      })
      .catch((error) => {
        dispatch(addCartFailure(error));
      });
  };
};

export const getCart = (id) => {
  return (dispatch) => {
    dispatch(addCartRequest());
    getCartItem(id)
      .then((response) => {
        dispatch(addCartSuccess(response.data.cartItems));
      })
      .catch((error) => {
        dispatch(addCartFailure(error));
      });
  };
};
