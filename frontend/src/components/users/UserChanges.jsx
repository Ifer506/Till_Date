import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { toast ,Toaster} from "sonner";
import { BACKEND_BASE_URL } from "../../config";
import { userChange, userDetail } from "../../services/authServices";

const UserChanges = () => {
  const accessToken = localStorage.getItem("token");
  const userId = jwtDecode(accessToken).id;
  const [previewChanged, setPreviewChanged] = useState(false);
  const [user, setUser] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
    bio: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log("i have the file now");
    if (!file) return;

    // apparently the URL.createObjectURL() help to show a local preview of the file before upload
    const newPreviewURL = URL.createObjectURL(file);
    // const previewURL = URL.createObjectURL(file);

    //this shows that the file is loaded in the setSelectedfile
    setSelectedFile(file);
    setPreviewChanged(true); // boolean to show that the preview has changed

    //just to check is the temporary url worked and the image was stored temporarily
    // console.log("Preview URL: ", newPreviewURL);

    setUser((prevUser) => ({
      ...prevUser,
      profilepic: newPreviewURL,
    }));

    // Revoke the previous preview URL if there is one
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
    }

    setPreviewURL(newPreviewURL);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userDetail(userId);
        const data = response.data.data;
        setUser(data);
        setFormData({
          fullname: data.fullname || "",
          phone: data.phone || "",
          email: data.email || "",
          password: "",
          bio: data.bio || "",
        });
      } catch (error) {
        console.error("Failed to fetch user details:", error.message);
      }
    };
    fetchUser();

    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [userId, previewURL]);

  const handleImageSubmit = async () => {
    if (!selectedFile) return;
    const imageData = new FormData();
    imageData.append("profilepic", selectedFile);
    try {
      await userChange(userId, imageData);
      const updated = await userDetail(userId);
      setUser(updated.data.data);
      toast.success("Profile picture updated!", {duration: 1550});
    } catch (error) {
      console.error("Failed to update profile picture:", error.message);
      toast.error("Profile picture error!", {duration: 1550});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append("full_name", formData.fullname);
      updatedData.append("phone", formData.phone);
      updatedData.append("email", formData.email);
      if (formData.password) updatedData.append("password", formData.password);
      updatedData.append("bio", formData.bio);
      if (selectedFile) updatedData.append("profilepic", selectedFile);

      await userChange(userId, updatedData);

      const updated = await userDetail(userId);
      setUser(updated.data.data);
      setPreviewChanged(false);
      toast.success("Profile updated successfully!", {duration: 1550});
    } catch (error) {
      toast.error("Failed to update profile:", error.message, {duration: 1550});
    }
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="bg-white text-gray-900 flex items-left justify-center py-5">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-8">Public profile</h1>

        <div className="flex flex-col items-center mb-10">
          <div className="flex flex-col items-center">
            <label
              htmlFor="profile-pic-upload"
              className="relative group cursor-pointer"
            >
              {/* <img
                src={`${BACKEND_BASE_URL}/${user.profilepic}`}
                //only for testing the image pathing is correct
                // src='http://localhost:3000/uploads/userProfile/1746444587675-230143538.png'
                name="profilepic"
                alt="Profile"
                className="w-50 h-50 rounded-full shadow-md object-cover"
              /> */}
              {/* <img
                src={
                  user.profilepic?.startsWith("blob:")
                    ? user.profilepic
                    : `${BACKEND_BASE_URL}/${user.profilepic}`
                }
                alt="Profile"
                className="w-50 h-50 rounded-full shadow-md object-cover"
              /> */}

              <img
                src={previewURL || `${BACKEND_BASE_URL}/${user.profilepic}`}
                alt="Profile"
                className="w-50 h-50 rounded-full shadow-md object-cover"
              />

              {/* Edit Icon Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <svg
                  xmlns=""
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13l6-6 3.536 3.536-6 6H9v-3z"
                  />
                </svg>
              </div>
            </label>
            {previewChanged && (
              <span className="text-sm text-yellow-600 mt-2">
                Image not saved yet
              </span>
            )}

            <input
              id="profile-pic-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* the below code is no longer needed as the images are previewed and we can see the actual image or manually pressing the button */}
          {/* <div className="flex flex-col md:flex-row items-center gap-3 mt-4">
            <button
              onClick={handleImageSubmit}
              className="bg-blue-900 hover:bg-indigo-900 text-white px-4 py-2 rounded-lg font-medium"
            >
              Change picture
            </button>
            <button className="border border-[#2d2d65] text-[#2d2d65] px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
              Delete picture
            </button>
          </div> */}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d2d65]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Contact Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d2d65]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d2d65]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d2d65]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              placeholder="Write a short bio..."
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d2d65]"
            ></textarea>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-900 hover:bg-indigo-900 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserChanges;
