import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

import { userDetail } from "../services/authServices"; // adjust path as needed

const UserChanges = () => {
  const accessToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const userId = jwtDecode(accessToken).id;

  const editUser = async () => {
    
    if (!accessToken) {
      console.error("User not authenticated.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phoneNumber", num);
    formData.append("cv", cvFile);
    formData.append("profile", profile);

    const headers = {
      Authorization: `${accessToken}`,
      "Content-Type": "multipart/form-data",
    };
    try {
      const response = await axios.post("/users/editProfile", formData, {
        headers,
      });
      if (response.status === 200) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userDetail(userId);
        setUser(response.data.data); // Assuming response is { data: { data: userObject } }
      } catch (error) {
        console.error("Failed to fetch user details:", error.message);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      {user ? (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Profile Picture</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border px-4 py-2">
                {user.profile_picture ? (
                  <img
                    src={`/${user.profile_picture}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.fullname}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="border px-4 py-2" >
                
              </td>
              
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserChanges;
