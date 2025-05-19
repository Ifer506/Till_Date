import { useEffect, useState } from "react";
import { salesDetail } from "../../routes/salesRoutes";
import { searchRoutes } from "../../routes/searchRoutes";

const SalesDetail = ({ onEdit }) => {
  const [sales, setSales] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        if (searchText.trim()) {
          const response = await searchRoutes("sales", searchText);
          setSales(response.data.data);
        } else {
          const response = await salesDetail();
          setSales(response.data.data); // now it's an array of sales
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSales();
  }, [searchText]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className=" ">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-semibold">Sales Receipt</h1>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for bills"
          className="p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        />  
      </div>

      <div className="relative ">
        <div className="static top-0 left-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sales.map((sale, saleIndex) => (
            <div
              key={sale.sale_id}
              className="mb-6 p-4 bg-white shadow-xl rounded-2xl border-gray-200 border-2 "
            >
              <div className="mb-2 text-sm text-gray-500">
                <span>Sale ID: {sale.id}</span> |{" "}
                <span>Date: {new Date(sale.created_at).toLocaleString()}</span>
              </div>

              {sale.items.map((item, itemIndex) => (
                <div
                  key={`${sale.id}-${item.item_id}`}
                  className="flex justify-between items-center border-b border-gray-300 py-3"
                >
                  <div>
                    <h3 className="text-md font-medium">{item.item_name}</h3>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × Rs. {item.price}
                    </p>
                  </div>
                  <div className="text-md font-semibold">
                    Rs. {item.quantity * item.price}
                  </div>
                </div>
              ))}

              <div className="flex justify-between text-lg font-bold  pt-3 mt-3">
                <span>Total:</span>
                <span>Rs. {sale.total_amount}</span>
              </div>

              <div className="mt-4 flex gap-4 print:hidden">
                <button
                  className="px-4 py-2 border rounded-lg"
                  onClick={() => onEdit(sale)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg"
                  onClick={handlePrint}
                >
                  Print
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesDetail;
