import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { BACKEND_BASE_URL } from "../../config";
import { allProduct } from "../../routes/productRoutes";
import { createSales } from "../../routes/salesRoutes";
import { searchRoutes } from "../../routes/searchRoutes";

const TABS = [
  { key: "cart", label: "Cart" },
  { key: "customer", label: "Customer" },
];

const CreateSale = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState("cart");
  const [applyTax, setApplyTax] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    company_name: "",
    company_address: "",
    vat_number: "",
    pan_number: "",
    business_use: "",
    contact_name: "",
    contact_number: "",
  });

  const customerPlaceholders = {
    company_name: "Chaudhary Group",
    company_address: "Sanepa, Lalitpur, Nepal",
    vat_number: "VAT123456789",
    pan_number: "PAN987654321",
    business_use: "Retail",
    contact_name: "Binod Chaudhary",
    contact_number: "+977-9800000000",
  };

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
    if (item.quantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.item_id === item.item_id ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.item_id === item.item_id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.item_id === item.item_id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setItems((prevItems) => {
      return prevItems.map((product) => {
        const cartItem = cartItems.find((c) => c.item_id === product.item_id);
        if (cartItem) {
          return {
            ...product,
            quantity: product.quantity + cartItem.quantity,
          };
        }
        return product;
      });
    });
    setCartItems([]);
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.item_id === id);
    if (itemToRemove) {
      setItems((prevItems) =>
        prevItems.map((i) =>
          i.item_id === itemToRemove.item_id
            ? { ...i, quantity: i.quantity + itemToRemove.quantity }
            : i
        )
      );
    }
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.item_id !== id)
    );
  };

  const getItemQuantityColor = (quantity) => {
    if (quantity < 1) {
      return "rounded-lg border-red-500 bg-red-100 text-red-500 px-2";
    } else if (quantity > 5) {
      return "rounded-lg border-green-500 bg-green-100 text-green-500 px-2";
    } else {
      return "rounded-lg border-yellow-500 bg-yellow-100 text-yellow-500 px-2";
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.selling_price || 0),
    0
  );
  const taxAmount = applyTax ? subtotal * 0.13 : 0;
  const total = subtotal + taxAmount;

  // For tab underline animation
  const tabRefs = useRef([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const idx = TABS.findIndex((tab) => tab.key === activeTab);
    if (tabRefs.current[idx]) {
      setUnderlineStyle({
        left: tabRefs.current[idx].offsetLeft,
        width: tabRefs.current[idx].clientWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 -mt-4 -ml-4">
      <div className="flex flex-col w-full p-2 space-y-4">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 shadow rounded">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
            placeholder="Search for items"
          />
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={applyTax}
                onChange={() => setApplyTax((prev) => !prev)}
              />
              Apply Tax
            </label>
          </div>
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
                  className={`p-4 border border-gray-200 rounded flex flex-col items-center
                    ${
                      item.quantity < 1
                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                        : "cursor-pointer hover:shadow"
                    }
                  `}
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
                  <div className="text-m font-medium flex justify-between items-center w-30 gap-1">
                    <span>{item.item_name}</span>
                    <span
                      className={`${getItemQuantityColor(item.quantity)} shrink-0`}
                    >
                      {item.quantity}
                    </span>
                  </div>
                  {item.quantity < 1 && (
                    <span className="text-xs text-red-500 font-semibold mt-1">
                      Sold Out
                    </span>
                  )}
                  <p className="text-sm text-gray-700">
                    Rs {item.selling_price || "0.00"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cart & Customer Tabs */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 relative">
            {/* Tab Bar */}
            <div className="relative flex bg-gray-50 rounded-t">
              {TABS.map((tab, idx) => (
                <button
                  key={tab.key}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-4 py-2 font-medium transition-colors ${
                    activeTab === tab.key
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-blue-600"
                  } focus:outline-none`}
                  aria-selected={activeTab === tab.key}
                  role="tab"
                >
                  {tab.label}
                </button>
              ))}
              {/* Underline */}
              <span
                className="absolute bottom-0 h-1 bg-blue-600 rounded transition-all duration-300"
                style={{
                  left: underlineStyle.left,
                  width: underlineStyle.width,
                }}
              />
            </div>

            {/* Tab Content with swipe animation */}
            <div className="relative flex-1 min-h-[350px] h-full">
              {/* Cart Panel */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ${
                  activeTab === "cart"
                    ? "translate-x-0 opacity-100 z-10"
                    : "-translate-x-full opacity-0 pointer-events-none z-0"
                }`}
                role="tabpanel"
                aria-hidden={activeTab !== "cart"}
              >
                <div className="bg-white p-4 shadow rounded-b flex flex-col justify-between h-full pb-24">
                  <ul className="space-y-2 overflow-y-auto max-h-64">
                    {cartItems.map((item) => (
                      <li
                        key={item.item_id}
                        className="flex justify-between items-center border-b py-2"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {item.item_name}
                          </p>
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
                  <button
                    onClick={clearCart}
                    className="absolute inset-x-4 bottom-4 text-sm text-white px-4 py-2 rounded bg-red-500 hover:bg-red-600"
                    disabled={cartItems.length === 0}
                  >
                    Empty
                  </button>
                  <div className="mt-4 border-t pt-4 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rs {subtotal.toFixed(2)}</span>
                    </div>
                    {applyTax && (
                      <div className="flex justify-between">
                        <span>Tax (13%)</span>
                        <span>Rs {taxAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-base">
                      <span>Total</span>
                      <span>Rs {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Customer Panel */}
              <div
                className={`absolute inset-0 transition-transform duration-300 ${
                  activeTab === "customer"
                    ? "translate-x-0 opacity-100 z-10"
                    : "translate-x-full opacity-0 pointer-events-none z-0"
                }`}
                role="tabpanel"
                aria-hidden={activeTab !== "customer"}
              >
                <div className="bg-white p-4 shadow rounded-b h-full pb-24">
                  <h2 className="text-lg font-semibold mb-3">
                    Customer Details
                  </h2>
                  <div className="space-y-3">
                    {Object.entries(customerInfo).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        {/* this is what is above the input field a.k.a Company Name */}
                        <label className="text-xs capitalize">
                          {key.replace(/_/g, " ")}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            setCustomerInfo((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          className="px-2 py-1 border rounded text-sm"
                          placeholder={customerPlaceholders[key]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar (Fixed) */}
            <div className="bottom-0 left-0 w-full z-20">
              <div className="flex gap-2 p-4 bg-white  rounded-b shadow">
                <button
                  className="flex-1 text-sm text-white px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
                  onClick={async () => {
                    if (cartItems.length === 0) {
                      toast.error("Your cart is empty.", { duration: 1550 });
                      return;
                    }
                    try {
                      const salesData = {
                        items: cartItems.map((item) => ({
                          item_id: item.item_id,
                          quantity: item.quantity,
                          price: item.selling_price,
                        })),
                        total_amount: subtotal,
                        tax_applied: applyTax,
                        ...customerInfo, //  This spreads each customer field into the root level
                      };
                      setCustomerInfo({
                        company_name: "",
                        company_address: "",
                        vat_number: "",
                        pan_number: "",
                        business_use: "",
                        contact_name: "",
                        contact_number: "",
                      });

                      const response = await createSales(salesData);
                      console.log("Sales detail response:", response.data);
                      console.log(
                        "Sales detail message:",
                        response.data.message
                      );

                      clearCart();

                      // Refresh the page after a short delay so the toast can show
                      setTimeout(() => {
                        window.location.reload();
                      }, 100);
                      toast.success("Sale completed successfully!", {
                        duration: 1550,
                      });
                    } catch (error) {
                      console.error("Failed to complete sale", error);
                      toast.error("Error while completing the sale.", {
                        duration: 1550,
                      });
                    }
                  }}
                  disabled={cartItems.length === 0}
                >
                  Complete Sale
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSale;
