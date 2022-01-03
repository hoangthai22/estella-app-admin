import axios from "axios";

const BASE__URL = "https://estella-app-api.herokuapp.com/api";
const PRODUCTS__URL = "products";

export const uploadImg = (files) => {
  return axios.get(`${BASE__URL}/${PRODUCTS__URL}`);
};
