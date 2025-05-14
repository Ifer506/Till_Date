import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

// Your backend base URL
const API = axios.create({
  baseURL: BACKEND_BASE_URL, // Adjust this port if your backend runs on a different one
});

export const createSales = async (salesData) => {
  return API.post(`/product/salesItem`, salesData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};