import axios from "axios";

// Your backend base URL
const API = axios.create({
  baseURL: "http://localhost:3000/", // Adjust this port if your backend runs on a different one
});

// Signup API
export const registerUser = async (userData) => {
  return API.post("/user/register", userData);
};

// Login API
export const loginUser = async (loginData) => {
  return API.post("/user/login", loginData);
};
