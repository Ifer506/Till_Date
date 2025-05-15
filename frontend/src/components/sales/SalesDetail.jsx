import { useEffect, useState } from "react";
import { salesDetail } from "../../routes/salesRoutes";

const SalesDetail = ({ onEdit }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await salesDetail();
        setSales(response.data.data); // now it's an array of sales
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSales();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Sales Receipt</h2>

      {sales.map((sale, saleIndex) => (
        <div
          key={sale.sale_id}
          className="mb-6 p-4 bg-white shadow-md rounded-xl border print:border-none print:shadow-none"
        >
          <div className="mb-2 text-sm text-gray-500">
            <span>Sale ID: {sale.sale_id}</span> |{" "}
            <span>Date: {new Date(sale.sale_date).toLocaleString()}</span>
          </div>

          {sale.items.map((item, itemIndex) => (
            <div
              key={`${sale.sale_id}-${item.item_id}`}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <h3 className="text-md font-medium">Item ID: {item.item_id}</h3>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} × Rs. {item.price}
                </p>
              </div>
              <div className="text-md font-semibold">
                Rs. {item.quantity * item.price}
              </div>
            </div>
          ))}

          <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
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
  );
};

export default SalesDetail;
