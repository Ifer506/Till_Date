import { useEffect, useRef, useState } from "react";
import { BACKEND_BASE_URL } from "../../config";
import { useParams } from "react-router-dom";
import { oneProduct ,updateProduct} from "../../routes/productRoutes";

const EditProduct = () => {
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [status, setStatus] = useState("active");
  const [previewChanged, setPreviewChanged] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { itemId } = useParams(); // sincce the data id were getting from is the url

  // its only for changing tabs
  const TABS = [
    { key: "general", label: "General" },
    { key: "advanced", label: "Advanced" },
  ];
  const [activeTab, setActiveTab] = useState("general");

  // For tab underline animation
  const tabRefs = useRef([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  // for changing tabs
  useEffect(() => {
    const idx = TABS.findIndex((tab) => tab.key === activeTab);
    if (tabRefs.current[idx]) {
      setUnderlineStyle({
        left: tabRefs.current[idx].offsetLeft,
        width: tabRefs.current[idx].clientWidth,
      });
    }
  }, [activeTab]);

  const [formData, setFormData] = useState({
    item_name: "",
    item_desc: "",
    quantity: "",
    category: "",
    weight: "",
    purchase_price: "",
    selling_price: "",
    item_image: "",
    supplier_id: "",
    tax_rate: "",
    discont_info: "",
    is_active: "",
    record_level: "",
    created_date: "",
    updated_date: "",
  });

  // not required anymore as it has been used below as a format data
  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const response = await allProduct();
  //       setItems(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching product data:", error);
  //     }
  //   };
  //   fetchItems();
  // }, []);

  //handle image change and fetch changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newPreviewURL = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewChanged(true);

    setFormData((prev) => ({
      ...prev,
      profilepic: newPreviewURL,
    }));

    if (previewURL) {
      URL.revokeObjectURL(previewURL);
    }

    setPreviewURL(newPreviewURL);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await oneProduct(itemId);
        console.log(itemId);
        const data = response.data.data;
        setItems(data);
        setFormData({
          item_name: data.item_name || "",
          item_desc: data.item_desc || "",
          quantity: data.quantity || "",
          category: data.category || "",
          weight: data.weight || "",
          purchase_price: data.purchase_price || "",
          selling_price: data.selling_price || "",
          item_image: data.item_image || "",
          supplier_id: data.supplier_id || "",
          tax_rate: data.tax_rate || "",
          discont_info: data.discont_info || "",
          is_active: data.is_active || "",
          record_level: data.record_level || "",
          created_date: data.created_date || "",
          updated_date: data.updated_date || "",
        });
      } catch (error) {
        console.error("Failed to fetch items details:", error.message);
      }
    };
    fetchItems();

    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [itemId, previewURL]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  //handle changes for images
  const handleImageSubmit = async () => {
    if (!selectedFile) return;
    const imageData = new FormData();
    imageData.append("item_image", selectedFile);
    try {
      await updateProduct(itemId, imageData);
      const updated = await updateProduct(itemId);
      setItems(updated.data.data);
      toast.success("Product picture updated!", { duration: 1550 });
    } catch (error) {
      console.error("Failed to update product picture:", error.message);
      toast.error("Product picture error!", { duration: 1550 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append("item_name", formData.item_name);
      updatedData.append("item_desc", formData.item_desc);
      updatedData.append("quantity", formData.quantity);
      updatedData.append("category", formData.category);
      updatedData.append("weight", formData.weight);
      updatedData.append("purchase_price", formData.purchase_price);
      updatedData.append("selling_price", formData.selling_price);
      updatedData.append("supplier_id", formData.supplier_id);
      updatedData.append("tax_rate", formData.tax_rate);
      updatedData.append("discont_info", formData.discont_info);
      updatedData.append("is_active", status); // from state
      updatedData.append("record_level", formData.record_level);

      if (selectedFile) {
        updatedData.append("item_image", selectedFile);
      }

      // Replace this with your actual update function for product
      await updateProduct(itemId, updatedData);

      toast.success("Product updated successfully!", { duration: 1550 });
      setPreviewChanged(false);
    } catch (error) {
      console.error("Error updating product:", error.message);
      toast.error("Failed to update product!", { duration: 1550 });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 bg-white-100 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* 1/3 section */}
        <div className="w-full md:w-1/3 gap-x-8 gap-y-4">
          <div className="">
            <div className="flex flex-col gap-8 bg-white-200 rounded-lg ">
              <div className="bg-white-600 border-2  border-gray-200 shadow-md p-4 pb-15 rounded-2xl w-[300px] mx-auto block text-center ">
                <span className="text-2xl  bold text-shadow-lg/10">
                  Thumbnail
                </span>
                <div className="flex flex-col items-center p-8">
                  <label
                    htmlFor="items-pic-upload"
                    className="relative group cursor-pointer"
                  >
                    <img
                      src={previewURL || `${items.item_image}`}
                      alt="Profile"
                      className="w-50 h-50 rounded-3xl shadow-md object-cover"
                    />

                    {/* Edit Icon Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <svg
                        xmlns=""
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536M9 13l6-6 3.536 3.536-6 6H9v-3z"
                        />
                      </svg>
                    </div>
                  </label>
                  {previewChanged && (
                    <span className="text-sm text-yellow-600 mt-2">
                      Image not saved yet
                    </span>
                  )}

                  <input
                    id="item-pic-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <p className="text-sm align-text-top text-center text-gray-400 ">
                  Set the product thumbnail image. Only *.png, *.jpg and *.jpeg
                  image files are accepted
                </p>
              </div>
              <div className="bg-white-600 border-2  border-gray-200 shadow-md p-4 pb-8 rounded-2xl w-[300px] mx-auto block text-center ">
                <div className="text-2xl  bold text-shadow-lg/10">Status</div>
                <div className=" border-gray-200  p-4  w-[150px] md:w-[270px]  text-center">
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------------------- */}

        {/* 2/3 section */}
        <div className="w-full md:w-2/3">
          <div className="relative flex bg-gray-100 rounded-t-md shadow-md">
            {TABS.map((tab, idx) => (
              <button
                key={tab.key}
                ref={(el) => (tabRefs.current[idx] = el)}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-4 py-3 font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                    : "text-gray-500 hover:text-blue-600"
                } focus:outline-none`}
                aria-selected={activeTab === tab.key}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
            <span
              className="absolute bottom-0 h-1 bg-blue-600 rounded transition-all duration-300"
              style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
              }}
            />
          </div>

          {/* Tab Content Area */}
          <div className="bg-white p-6 rounded-b-lg shadow-md">
            {activeTab === "general" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  General Information
                </h2>
                <div>
                  <label className="block text-base mb-2 text-gray-800 text-shadow-xl font-medium">
                    Product Name -{" "}
                  </label>
                  <input
                    type="text"
                    name="Item name"
                    value={formData.item_name}
                    onChange={handleInputChange}
                    className="w-1/2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-100"
                  />
                </div>
              </div>
            )}

           
            {activeTab === "advanced" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Advanced Information
                </h2>
                <p className="text-gray-600">
                  Content for Advanced settings goes here.
                </p>
              </div>
            )}

             <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-900 hover:bg-indigo-900 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
