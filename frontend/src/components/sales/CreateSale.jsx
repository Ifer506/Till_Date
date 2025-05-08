import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../config";
import { allProduct } from "../../routes/productRoutes";
import { searchRoutes } from "../../routes/searchRoutes";

const CreateSale = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");

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
        console.error("Well here we are", error);
      }
    };

    fetchItems();
  }, [searchText]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex flex-col w-full p-4 space-y-4">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 shadow rounded">
          <input
            type="text"
            id="table-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for items"
          />
          <select className="px-4 py-2 border bg-gray-50 rounded-lg border-gray-300 ">
            <option>Default Customer</option>
            <option>Walk-in</option>
            <option>Regular Customer</option>
          </select>
          <select className="px-4 py-2 border bg-gray-50 rounded-lg border-gray-300 ">
            <option>Invoice</option>
            <option>Estimate</option>
            <option>Draft</option>
          </select>
          <button className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Pay
          </button>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          {/* Product Grid */}
          <div className="flex-1 bg-white p-4 shadow rounded overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <div
                  key={item.item_id}
                  className="p-4 border border-gray-200 rounded hover:shadow cursor-pointer flex flex-col items-center"
                >
                  {item.item_image ? (
                    <img
                      src={`${BACKEND_BASE_URL}${item.item_image}`}
                      alt={item.item_name}
                      className="w-50 h-28 object-cover rounded-2xl mb-2"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-gray-400 text-sm rounded-2xl mb-2">
                      No image
                    </div>
                  )}
                  <p className="text-m font-medium text-center">
                    {item.item_name}
                  </p>
                  <p className="text-sm text-gray-700">
                    Rs {item.selling_price || "0.00"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="w-full lg:w-1/3 bg-white p-4 shadow rounded flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-4">Cart</h2>
              <ul className="space-y-2 overflow-y-auto max-h-64">
                {/* Placeholder cart items */}
                {[...Array(3)].map((_, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <p className="text-sm font-medium">Product {i + 1}</p>
                      <p className="text-xs text-gray-500">Qty: 1 × $10</p>
                    </div>
                    <p className="text-sm font-semibold">$10</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cart Summary */}
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>$30.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>$2.40</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>$32.40</span>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSale;
