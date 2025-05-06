import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

// Your backend base URL
const API = axios.create({
  baseURL: BACKEND_BASE_URL, // Adjust this port if your backend runs on a different one
});

export const addProduct = async (productData) => {
  return API.post("/product/addProduct", productData);
};

export const allProduct = async () => {
  return API.get("/product/allProducts");
};
