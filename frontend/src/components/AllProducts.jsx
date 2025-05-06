import React, { useEffect, useState } from "react";
import { allProduct } from "../routes/productRoutes";

const AllProducts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await allProduct();
        setItems(response.data.data);
      } catch (error) {
        console.error(
          "Theres an error while pulling the data form product api"
        );
      }
    };
    fetchItems();
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Product List
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-emerald-600 text-white">
            <tr>
              {/* <th className="px-6 py-4">ID</th> */}
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Item Desc</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Category</th>
            </tr>
          </thead>
          <tbody>
            {items.map((items, idx) => (
              <tr
                key={items.item_id}
                className={`border-b hover:bg-gray-50 transition ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {/* <td className="px-6 py-4 font-medium text-gray-900">
                      {user.id}
                    </td> */}
                {/* <td className="px-4 py-2 flex items-center gap-1">
                      {user.profilepic ? (
                        <img
                          src={`${BACKEND_BASE_URL}/${user.profilepic}`}
                          alt="Profile"
                          className="w-20 h-20 rounded-2xl object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 italic ">No image</span>
                      )}
                    </td> */}
                <td className="px-3 py-4 text-xl">{items.item_id}</td>
                <td className="px-3 py-4 text-xl ">{items.item_name}</td>
                <td className="px-3 py-4 text-xl ">{items.item_desc}</td>
                <td className="px-3 py-4 text-xl ">{items.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
