import React from "react";
import { Link } from "react-router-dom";

const Setting = () => {
  return (
    <div className="flex flex-col  space-y-6 mt-10">
      <Link to="/userChanges">
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-200">
          See Yourself
        </button>
      </Link>
      
      <Link to="/allprofile">
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition duration-200">
          Users List
        </button>
      </Link>
    </div>
  );
};

export default Setting;
