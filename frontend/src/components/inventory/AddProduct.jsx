import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { addProduct } from "../../routes/productRoutes";

const AddProduct = () => {
  const [initialValues, setInitialValues] = useState({
    itemId: "",
    itemName: "",
    itemDesc: "",
    quantity: 0,
    category: "",
    weight: "",
    purchasePrice: "",
    sellingPrice: "",
    itemImage: null,
    supplierId: "",
    taxRate: "",
    discontInfo: "",
    isActive: true,
    recordLevel: "",
    createdDate: "",
    updatedDate: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setInitialValues((prev) => ({
      ...prev,
      createdDate: today,
      updatedDate: today,
    }));
  }, []);

  const validationSchema = Yup.object({
    itemName: Yup.string().required("Item name is required"),
    quantity: Yup.number().min(0, "Quantity cannot be negative"),
    purchasePrice: Yup.number().min(0, "Price must be non-negative"),
    sellingPrice: Yup.number().min(0, "Price must be non-negative"),
    taxRate: Yup.number().min(0, "Tax must be non-negative"),
    itemId: Yup.string().required("Item ID is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      // Append the text fields
      Object.entries(values).forEach(([key, value]) => {
        if (key !== "itemImage" && value !== null) {
          // Skip 'itemImage' for now
          formData.append(key, value);
        }
      });

      // Append the file
      if (values.itemImage) {
        formData.append("itemImage", values.itemImage);
      }

      // Send the request with form data
      const res = await addProduct(formData);

      toast.success("Product added successfully!", { duration: 1550 });
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product.", { duration: 1550 });
    }
  };

  return (
    <div className="bg-white text-gray-900 flex justify-center py-10">
      <div className="w-full max-w-4xl p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Fields */}
              {[
                ["Item Name", "itemName"],
                ["Item ID", "itemId"],
                ["Description", "itemDesc", "textarea"],
                ["Quantity", "quantity", "number"],
                ["Category", "category"],
                ["Weight", "weight"],
                ["Purchase Price", "purchasePrice", "number"],
                ["Selling Price", "sellingPrice", "number"],
                ["Supplier ID", "supplierId"],
                ["Tax Rate", "taxRate", "number"],
                ["Discount Info", "discontInfo"],
                ["Record Level", "recordLevel"],
                ["Created Date", "createdDate", "date"],
                ["Updated Date", "updatedDate", "date"],
              ].map(([label, name, type = "text"]) => (
                <div
                  key={name}
                  className={name === "itemDesc" ? "md:col-span-2" : ""}
                >
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <Field
                      as="textarea"
                      name={name}
                      rows="3"
                      className="w-full border px-3 py-2 rounded"
                    />
                  ) : (
                    <Field
                      type={type}
                      name={name}
                      className="w-full border px-3 py-2 rounded"
                    />
                  )}
                  <ErrorMessage
                    name={name}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setFieldValue("itemImage", e.target.files[0]);
                  }}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* isActive Checkbox */}
              <div className="flex items-center space-x-3">
                <Field type="checkbox" name="isActive" className="h-5 w-5" />
                <label className="text-sm font-medium">Is Active</label>
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-indigo-800 text-white py-2 px-6 rounded-lg"
                >
                  Add Product
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
