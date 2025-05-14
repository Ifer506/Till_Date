import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BACKEND_BASE_URL } from "../../config";
import { allProduct } from "../../routes/productRoutes";
import { searchRoutes } from "../../routes/searchRoutes";

import { Trash2 } from "lucide-react";

const CreateSale = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);

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

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.item_id === item.item_id);
      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map((i) =>
          i.item_id === item.item_id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.item_id !== id)
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 -mt-4 -ml-4">
      <div className="flex flex-col w-full p-2 space-y-4">
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
          <button
            disabled={cartItems.length === 0}
            className={`px-6 py-2 text-white rounded ${
              cartItems.length === 0
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
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
                  onClick={() => addToCart(item)}
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Cart</h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-white-500 hover:bg-red-400 px-4 py-2  rounded bg-red-500"
                  disabled={cartItems.length === 0}
                >
                  Empty
                </button>
              </div>

              <ul className="space-y-2 overflow-y-auto max-h-64">
                {Array.isArray(cartItems) &&
                  cartItems.map((item) => (
                    <li
                      key={item.item_id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div>
                        <p className="text-sm font-medium">{item.item_name}</p>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          Qty:
                          <input
                            type="number"
                            min="1"
                            className="w-12 text-center border rounded"
                            value={item.quantity}
                            onChange={(e) => {
                              const quantity = parseInt(e.target.value) || 1;
                              setCartItems((prevItems) =>
                                prevItems.map((i) =>
                                  i.item_id === item.item_id
                                    ? { ...i, quantity }
                                    : i
                                )
                              );
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-sm font-semibold">
                        Rs {(item.selling_price || 0) * item.quantity}
                      </p>
                      <button onClick={() => removeFromCart(item.item_id)}>
                        <Trash2 className="text-red-500 hover:text-red-700 w-4 h-4" />
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Cart Summary */}
            <div className="mt-4 border-t pt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  Rs{" "}
                  {Array.isArray(cartItems)
                    ? cartItems
                        .reduce(
                          (sum, item) =>
                            sum + item.quantity * (item.selling_price || 0),
                          0
                        )
                        .toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>
                  Rs{" "}
                  {Array.isArray(cartItems)
                    ? (
                        cartItems.reduce(
                          (sum, item) =>
                            sum + item.quantity * (item.selling_price || 0),
                          0
                        ) * 0.08
                      ).toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>
                  Rs{" "}
                  {Array.isArray(cartItems)
                    ? (
                        cartItems.reduce(
                          (sum, item) =>
                            sum + item.quantity * (item.selling_price || 0),
                          0
                        ) * 1.08
                      ).toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <button
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={async () => {
                  if (cartItems.length === 0) {
                    toast.error("Your cart is empty.", {duration: 1550});
                    return;
                  }

                  try {
                    const payload = {
                      items: cartItems.map((item) => ({
                        item_id: item.item_id,
                        quantity: item.quantity,
                        price: item.selling_price,
                      })),
                      total_amount: cartItems.reduce(
                        (sum, item) =>
                          sum + item.quantity * (item.selling_price || 0),
                        0
                      ),
                    };

                    const response = await createSales(payload);
                    console.log("Sale completed", response.data);

                    // Clear cart after successful sale
                    clearCart();

                    toast.success("Sale completed successfully!", {duration: 1550});
                  } catch (error) {
                    console.error("Failed to complete sale", error);
                    toast.error("Error while completing the sale.", {duration: 1550});
                  }
                }}
              >
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSale;
