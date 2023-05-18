import axios from "axios";

export const API_URL = "https://dummyjson.com";

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'No-Auth-Challenge': true
    }
  };
};

//GetAll product Data
export const getProductListData = async () =>
  await axios.get(`${API_URL}/products`);
