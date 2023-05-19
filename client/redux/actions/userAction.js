import { API_URL, getUserData, loginUser } from 'utils/api';
import * as type from "../types/type"
import axios from 'axios';

// Action creators
export const userRequest = () => ({
  type: type.SIGNUP_REQUEST
});

export const userSuccess = (products) => ({
  type: type.SIGNUP_SUCCESS,
  payload: products
});

export const userFailure = (error) => ({
  type: type.SIGNUP_FAILURE,
  payload: error
});

// Thunk action creator
export const signup = (data) => {
  return function (dispatch) {
    axios({
      method: "post",
      data: data,
      url: `${API_URL}/signup`,
    })
      .then(function (response) {
        dispatch(userSuccess(response?.data?.data));
      })
      .catch(function (response) {
        if (response.data.code === 400) {
          dispatch(userFailure(error));
        }
      });
  }
};

export const login = (data) => {
  return function (dispatch) {
    axios({
      method: "post",
      data: data,
      url: `${API_URL}/signin`,
    })
      .then(function (response) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.data))
        dispatch(userSuccess(response?.data?.data));
      })
      .catch((error) => {
        dispatch(userFailure(error));
      });
  }
};



