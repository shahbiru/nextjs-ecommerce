import axios from "axios";

export const API_URL = "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `${token}`,
      'No-Auth-Challenge': true
    }
  };
};

//GetAll User Data
export const getUserData = async (data) => {
  await axios.post(`${API_URL}/signup`, data);
}

export const loginUser = async (data) => {
  await axios.post(`${API_URL}/signin`, data);
}

//GetAll product Data
export const getProductListData = async () =>
  await axios.get(`${API_URL}/product`, getHeaders());

export const addCartItem = async (data) =>
  await axios.post(`${API_URL}/cart`, data, getHeaders());

export const getCartItem = async (id) =>{
  await axios.get(`${API_URL}/cart/${id}`, getHeaders());
}

export const updateCartItem = async (data) =>
  await axios.put(`${API_URL}/cart/${data.productId}`, data, getHeaders());
