import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../config";
import { allProduct ,updateProduct} from "../../routes/productRoutes";
import { searchRoutes } from "../../routes/searchRoutes";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (searchText.trim()) {
          const response = await searchRoutes("products", searchText);
          setItems(response.data.data);
        } else {
          const response = await allProduct();
          setItems(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchItems();
  }, [searchText]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await updateProduct(selectedProduct); // Assuming updateProduct accepts the updated product object
      if (response.data.success) {
        // Handle success
        console.log("Product updated successfully:", response.data.product);
        // Optionally, close modal or update UI
        setEditModalOpen(false);
      } else {
        // Handle failure
        console.error("Failed to update product:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
          <button
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownRadio"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
            type="button"
          >
            Last 30 days
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for items"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
            <th scope="col" className="p-4">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </th>
            <th scope="col" className="px-6 py-3">
              Product Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Active
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.item_id} className="bg-white border-b hover:bg-gray-50">
              <td className="p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4">
                {item.item_image ? (
                  <img
                    src={`${BACKEND_BASE_URL}${item.item_image}`}
                    alt="Product"
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                ) : (
                  <span className="text-gray-500 italic">No image</span>
                )}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.item_name}
              </td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="px-6 py-4">{item.category || "N/A"}</td>
              <td className="px-6 py-4">{item.selling_price}</td>
              <td className={`px-6 py-4 ${item.is_active ? 'text-teal-500' : 'text-red-800'}`}>
                {item.is_active ? 'Active' : 'Inactive'}
              </td>
              <td className="px-6 py-4">
                <Link
                  to={`/editProduct/${item.item_id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default AllProducts;
