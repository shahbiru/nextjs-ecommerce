import { getProductListData } from 'utils/api';
import * as type from "../types/type"

// Action creators
export const fetchProductsRequest = () => ({
  type: type.FETCH_PRODUCTS_REQUEST
});

export const fetchProductsSuccess = (products) => ({
  type: type.FETCH_PRODUCTS_SUCCESS,
  payload: products
});

export const fetchProductsFailure = (error) => ({
  type: type.FETCH_PRODUCTS_FAILURE,
  payload: error
});

// Thunk action creator
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsRequest());
    getProductListData()
      .then((response) => {
        dispatch(fetchProductsSuccess(response?.data));
      })
      .catch((error) => {
        dispatch(fetchProductsFailure(error));
      });
  };
};
