import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../config";
import { allprofile } from "../services/authServices";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await allprofile();
        setUsers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch users details:", error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Users Profile
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-emerald-600 text-white">
            <tr>
              {/* <th className="px-6 py-4">ID</th> */}
              <th className="px-6 py-4">Profile</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Info</th> {/* 👈 New Column */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user.id}
                className={`border-b hover:bg-gray-50 transition ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {/* <td className="px-6 py-4 font-medium text-gray-900">
                  {user.id}
                </td> */}
                <td className="px-4 py-2 flex items-center gap-1">
                  {user.profilepic ? (
                    <img
                      src={`${BACKEND_BASE_URL}/${user.profilepic}`}
                      alt="Profile"
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 italic ">No image</span>
                  )}
                </td>
                <td className="px-3 py-4 text-xl">{user.fullname}</td>
                <td className="px-3 py-4 text-xl ">{user.email}</td>
                <td className="px-3 py-4 text-xl ">{user.phone}</td>
                <td className="px-3 py-4 text-xl ">{user.bio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
