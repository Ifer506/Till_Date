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

export const userDetail = async (id) => {
  return API.get(`/user/profile/${id}`,id);
};

export const userChange = async (id, formData) => {
  return API.put(`/user/profile/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const allprofile = async () => {
  return API.get("/user/allprofile");
};
