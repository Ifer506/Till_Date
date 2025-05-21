import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

// Your backend base URL
const API = axios.create({
  baseURL: BACKEND_BASE_URL, // Adjust this port if your backend runs on a different one
});

export const createSales = async (salesData) => {
  return API.post(`/sales/salesItem`, salesData );
};

export const salesDetail = async ( ) => {
  return API.get("/sales/salesDetail")
}

export const salesDelete = async ( id) => {
  return API.delete(`/sales/salesDelete/${id}`,id)
}