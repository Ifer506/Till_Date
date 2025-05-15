import { Link } from "react-router-dom";

const Sales = () => {
  return (
    <div className="flex flex-col space-y-6 mt-10">
      <Link to="/createSales">
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-200">
          Selling a product
        </button>
      </Link>
      <Link to="/salesDetails">
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-200">
          Sales list
        </button>
      </Link>
    </div>
  );
};

export default Sales;
