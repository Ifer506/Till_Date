import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { userDetail, userChange } from "../services/authServices";

const UserChanges = () => {
  const accessToken = localStorage.getItem("token");
  const userId = jwtDecode(accessToken).id;

  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userDetail(userId);
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error.message);
      }
    };

    fetchUser();
  }, [userId]);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    try {
      await userChange(userId, formData);
      setShowModal(false);
      // Refresh profile after update
      const updated = await userDetail(userId);
      setUser(updated.data.data);
    } catch (error) {
      console.error("Failed to update profile picture:", error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl ">
      <h2 className="text-3xl font-semibold mb-6 text-left text-gray-800">
        Your Profile
      </h2>

      {user ? (
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
          <div className="relative p-8">
            <img
              src={user.profile_picture ? `/${user.profile_picture}` : "/default.png"}
              alt="Profile"
              className="w-50 h-50 rounded-full object-cover border-2 border-emerald-500 cursor-pointer"
              onClick={handleImageClick}
            />
            <p className="text-sm text-gray-500 mt-2">Click to change photo</p>
          </div>
          <div className="mt-6 space-y-2 text-gray-700">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Full Name:</strong> {user.fullname}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Change Profile Picture</h3>
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4"
              accept="image/*"
            />
            <div className="flex justify-between">
              <button
                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                onClick={handleImageSubmit}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserChanges;
