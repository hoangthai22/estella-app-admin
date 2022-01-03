import axios from "axios";

const BASE__URL = "https://estella-app-api.herokuapp.com/api";
const PRODUCTS__URL = "products";
const CATEGORY__URL = "categorys";

const TEST__URL = "http://localhost:4000/api/product";

export const getListProducts = () => {
  return axios.get(`${BASE__URL}/${PRODUCTS__URL}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
export const getListCategory = () => {
  return axios.get(`${BASE__URL}/${CATEGORY__URL}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};

export const addProduct = (data) => {
  return axios.post(`${TEST__URL}`, data, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
