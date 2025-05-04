import { Pencil } from "lucide-react"; // ✅ install lucide-react: npm i lucide-react
import React, { useEffect, useState } from "react";
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

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Users Profile
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Profile</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Edit</th> {/* 👈 New Column */}
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
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.id}
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  {user.profile_picture ? (
                    <img
                      src={`/${user.profile_picture}`}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 italic">No image</span>
                  )}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.fullname}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-emerald-600 hover:text-emerald-800 transition"
                    title="Edit User"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
