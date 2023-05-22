import { API_URL, getUserData, loginUser } from 'utils/api';
import * as type from "../types/type"
import axios from 'axios';
import Router from "next/router";
import { toast } from "react-toastify";

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
export const signup = (data,check) => {
  return function (dispatch) {
    axios({
      method: "post",
      data: data,
      url: `${API_URL}/signup`,
    })
      .then(function (response) {
        dispatch(userSuccess(response?.data?.data));
        if(response.status === 200){
          dispatch(login({email:data.email, password:data.password},check))
        }
      })
      .catch(function (error) {
          toast.error(error.response.data.msg)
          dispatch(userFailure(error));
      });
  }
};

export const login = (data,check) => {
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
        if(response.status === 200 && check){
          toast.success("Register Successfully!")
        }else{
          toast.success("Login Successfully!")
        }
        Router.push("/")
      })
      .catch((error) => {
        toast.error("Invalid credentials!")
        dispatch(userFailure(error));
      });
  }
};



