import { AnimatePresence, motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/till_date_circle.png";
import { userDetail ,profileImg} from "../services/authServices";
import { BACKEND_BASE_URL } from "../config";



const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullname] = useState("");
  const [profilepic, setProfileimg] = useState("");


  const logOut = async () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const getUserProfile = async () => {
    // console.log("INSIDE GETuserprofile");
    try {
      const accessToken = localStorage.getItem("token"); // You might need to adjust this based on how you store the access token
      const userId = jwtDecode(accessToken).id;

      if (!accessToken) {
        // If the access token is not available, handle the authentication error
        console.error("User not authenticated.");

        return;
      } else {
        console.log("User authenticated.");

        // console.error(accessToken);
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      const response = await userDetail(userId);
      console.log(userId);
      console.log(response.data.data.email);

      if (response.status === 200) {
        // setProfileImage(response.data.data.profile);
        setEmail(response.data.data.email);
        setFullname(response.data.data.fullname);
        setProfileimg(response.data.data.profilepic)
        // console.log(response.data);
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // <nav className="bg-gradient-to-br from-teal-950 to-slate-900">
    //   <div className=" flex items-center justify-between mx-auto p-4">
    //     {/* Logo - Left */}
    //     <Link to="/home">
    //       <div className="flex items-center space-x-3">
    //         <img src={logo} className="h-8" alt="Till Date Logo" />
    //         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
    //           Till Date
    //         </span>
    //       </div>
    //     </Link>

    //     {/* Profile Button - Right */}
    //     <div className="relative" ref={dropdownRef}>
    //       <button
    //         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    //         className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-500 dark:hover:text-blue-400 md:me-0 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-white"
    //       >
    //         <span className="sr-only">Open user menu</span>
    //         <img
    //           className="w-8 h-8 me-2 rounded-full border-2 border-white"
    //           alt="user"
    //           src="https://i.pravatar.cc/300"
    //         />
    //         {fullName}
    //       </button>

    //       {/* Animate Dropdown */}
    //       <AnimatePresence>
    //         {isDropdownOpen && (
    //           <motion.div
    //             initial={{ opacity: 0, y: -10 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             exit={{ opacity: 0, y: -10 }}
    //             transition={{ duration: 0.2 }}
    //             className="absolute right-0 mt-2 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600"
    //           >
    //             <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
    //               <div className="font-medium">{fullName}</div>
    //               <div className="truncate">{email}</div>
    //             </div>
    //             <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
    //               <li>
    //                 <a
    //                   href="#"
    //                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //                 >
    //                   Dashboard
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href="#"
    //                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //                 >
    //                   Settings
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href="#"
    //                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    //                 >
    //                   Earnings
    //                 </a>
    //               </li>
    //             </ul>
    //             <div className="py-2" onClick={logOut}>
    //               <a
    //                 href="#"
    //                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //               >
    //                 Sign out
    //               </a>
    //             </div>
    //           </motion.div>
    //         )}
    //       </AnimatePresence>
    //     </div>
    //   </div>
    // </nav>
    <nav className=" bg-gradient-to-r from-black via-gray-900 to-gray-700">
      <div className="mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/home">
          <div className="flex items-center space-x-3">
            <img src={logo} className="h-8" alt="Till Date Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Till Date
            </span>
          </div>
        </Link>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className={`${isDropdownOpen ? "hidden" : "inline-flex"}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                className={`${isDropdownOpen ? "inline-flex" : "hidden"}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-500 dark:hover:text-blue-400 md:me-0 focus:ring-0 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-white"
          >
            <img
              className="w-8 h-8 me-2 rounded-full border-2 border-white"
              alt="user"
              src={
                profilepic
                  ? `${BACKEND_BASE_URL}/${profilepic}`
                  : "https://i.pravatar.cc/300"
              }
              
            />
            {fullName}
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-11 left-1 mt-2 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div className="font-medium">{fullName}</div>
                  <div className="truncate">{email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      to="/home"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/setting"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                </ul>
                <div className="py-2" onClick={logOut}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden ${isDropdownOpen ? "block" : "hidden"} px-4 pb-4`}
      >
        <div className="space-y-2 bg-white rounded-md shadow-md dark:bg-gray-800">
          <div className="px-4 py-2 text-sm text-gray-900 dark:text-white">
            <div className="font-medium">{fullName}</div>
            <div className="truncate">{email}</div>
          </div>
          <a
            href="#"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
          >
            Dashboard
          </a>
          <a
            href="/settings"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
          >
            Earnings
          </a>
          <a
            href="#"
            onClick={logOut}
            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Sign out
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
