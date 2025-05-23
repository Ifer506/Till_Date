import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

// Your backend base URL
const API = axios.create({
  baseURL: BACKEND_BASE_URL, // Adjust this port if your backend runs on a different one
});

// Signup API
export const registerUser = async (userData) => {
  return API.post("/user/register", userData);
};

// Login API
export const loginUser = async (loginData) => {
  return API.post("/user/login", loginData);
};

//get users details
export const userDetail = async (id) => {
  return API.get(`/user/profile/${id}`, id);
};

//save changes done to the users profile
export const userChange = async (id, formData) => {
  return API.put(`/user/profile/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//get image of the user and upload it
export const profileImg = async () => {
  return API.get(
    `http://localhost:3000/uploads/userProfile/${user.profilepic}`
  );
};

// export const getPicByID = async () => {
//   return API.get(`/uploads/userProfile/${user.profile_picture}`)
// }

export const allprofile = async () => {
  return API.get("/user/allprofile");
};
