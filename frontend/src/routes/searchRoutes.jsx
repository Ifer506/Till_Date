import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

const API = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export const searchRoutes = async (typeShite,addres) => {
    return API.get(`/enhancement/search?type=${typeShite}&query=${addres}`);
};
