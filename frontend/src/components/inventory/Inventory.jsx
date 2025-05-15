import React from 'react'
import { Link } from 'react-router-dom';

const Inventory = () => {
  return (
    <div className="flex flex-col  space-y-6 mt-10">
      <Link to="/addProducts">
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-200">
          Add Product
        </button>
      </Link>
      <Link to="/allProducts">
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-200">
          All Products
        </button>
      </Link>
      
      
      
    </div>
  );
};

export default Inventory
