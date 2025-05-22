import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

// Your backend base URL
const API = axios.create({
  baseURL: BACKEND_BASE_URL, // Adjust this port if your backend runs on a different one
});

export const addProduct = async (productData) => {
  return API.post(`/product/addProduct`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const allProduct = async () => {
  return API.get("/product/allProducts");
};

export const updateProduct = async (id, product) => {
  try {
    const response = await API.put(`/product/updateProduct/${id}`, product, {
      headers: {
        "Content-Type": "multipart/form-data", // ✅ CRITICAL
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unknown error");
  }
};

export const oneProduct = async (id) => {
  return API.get(`/product/oneProducts/${id}`);
};
