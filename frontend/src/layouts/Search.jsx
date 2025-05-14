import React, { useEffect, useState, useCallback } from "react";
import { BACKEND_BASE_URL } from "../../config";
import { allProduct } from "../../routes/productRoutes";
import { debounce } from "lodash";

const Search = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await allProduct();
        setItems(response.data.data);
        setFilteredItems(response.data.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchItems();
  }, []);

  // Debounced version of the filtering logic
  const debouncedFilter = useCallback(
    debounce((query, items) => {
      const filtered = items.filter((item) =>
        item.item_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFilter(searchQuery, items);
    // Clean up on unmount
    return () => debouncedFilter.cancel();
  }, [searchQuery, items, debouncedFilter]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="mb-4 relative">
        <input
          type="text"
          id="table-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for items"
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

      {/* Search Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.item_id}
            className="p-4 border border-gray-200 rounded hover:shadow cursor-pointer flex flex-col items-center"
          >
            {item.item_image ? (
              <img
                src={`${BACKEND_BASE_URL}${item.item_image}`}
                alt={item.item_name}
                className="w-24 h-24 object-cover rounded mb-2"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-gray-400 text-sm rounded mb-2">
                No image
              </div>
            )}
            <p className="text-sm font-medium text-center">{item.item_name}</p>
            <p className="text-xs text-gray-500">Rs {item.price || "0.00"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
