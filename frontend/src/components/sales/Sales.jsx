import React from 'react';
import { Link } from 'react-router-dom';


const Sales = () => {
  return (
    <Link to="/createSales">
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-200">
          Selling a product
        </button>
      </Link>
  );
};

export default Sales;
