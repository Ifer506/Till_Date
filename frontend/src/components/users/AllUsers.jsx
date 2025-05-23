import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../config";
import { searchRoutes } from "../../routes/searchRoutes";
import { allprofile } from "../../services/authServices";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (searchText.trim()) {
          const response = await searchRoutes("users", searchText);
          setUsers(response.data.data);
        } else {
          const response = await allprofile();
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch users details:", error.message);
      }
    };

    fetchUser();
  }, [searchText]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Users Profile
      </h2>

      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
          <button
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownRadio"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
            type="button"
          >
            Filter
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              fill="none"
              viewBox="0 0 10 6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l4 4 4-4"
              />
            </svg>
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            id="table-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for users"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="p-4">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </th>
            <th className="px-6 py-3">Profile</th>
            <th className="px-6 py-3">Full Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Info</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
              <td className="p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4">
                {user.profilepic ? (
                  <img
                    src={`${BACKEND_BASE_URL}/${user.profilepic}`}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 italic">No image</span>
                )}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {user.fullname}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">{user.bio || "N/A"}</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
