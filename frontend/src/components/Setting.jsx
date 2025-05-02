import React from "react";
import { Link } from "react-router-dom";
import UserChanges from './UserChanges';

const Setting = () => {
  return (
    <div>
      <Link to="/userChanges">
        <button className="bg-amber-900">Users List</button>
      </Link>
    </div>
  );
};

export default Setting;
