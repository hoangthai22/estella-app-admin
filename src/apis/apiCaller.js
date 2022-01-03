import axios from "axios";

const BASE__URL = "https://estella-app-api.herokuapp.com/api";
const PRODUCTS__URL = "products";

export const getListProducts = () => {
  return axios.get(`${BASE__URL}/${PRODUCTS__URL}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
