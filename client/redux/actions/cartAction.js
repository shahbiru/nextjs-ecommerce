import { addCartItem, getCartItem, updateCartItem } from 'utils/api';
import * as type from "../types/type"
import { toast } from "react-toastify";
import axios from 'axios';
import { API_URL } from 'utils/api';

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
        dispatch(getCart(data?.userId))
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
  return function (dispatch) {
    const token = localStorage.getItem("token")
    axios({
      method: "get",
      url: `${API_URL}/cart/${id}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        dispatch(addCartSuccess(response?.data?.cartItems));
      })
      .catch((error) => {
        dispatch(addCartFailure(error));
      });
  }
};

export const updateCart = (data) => {
  return (dispatch) => {
    dispatch(addCartRequest());
    updateCartItem(data)
      .then((response) => {
        console.log(response)
        dispatch(addCartSuccess(response?.data));
        dispatch(getCart(data?.userId))
        if (response.status === 200) {
          toast.success("Product added to card")
        }
      })
      .catch((error) => {
        dispatch(addCartFailure(error));
      });
  };
};

