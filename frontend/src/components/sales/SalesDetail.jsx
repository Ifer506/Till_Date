import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { salesDelete, salesDetail } from "../../routes/salesRoutes";
import { searchRoutes } from "../../routes/searchRoutes";

const SalesDetail = ({ onEdit }) => {
  const [sales, setSales] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [expandedBills, setExpandedBills] = useState({});
  const contentRef = useRef < HTMLDivElement > null;
  const reactToPrintFn = useReactToPrint({ contentRef });

  const componentRef = useRef();
  // For v3+ syntax
  const handlePrint = useReactToPrint({
    contentRef: componentRef, // Direct ref instead of callback
  });

  const toggleBill = (saleId) => {
    setExpandedBills((prev) => ({ ...prev, [saleId]: !prev[saleId] }));
  };

  const PrintableContent = forwardRef(({ sale }, ref) => (
    <div ref={ref} className="print-only">
      <h2>Sale #{sale.id}</h2>
      <div>Total: Rs. {sale.total_amount}</div>
      {/* Other sale details */}
    </div>
  ));

  const handleDelete = async (id) => {
    if (!window.confirm("Confirming you want to delete this bill ?")) return;

    try {
      await salesDelete(id);
      setSales((prev) => prev.filter((sale) => sale.id !== id));
      toast.success(`You have success fully deleted id number ${id}`);
    } catch (error) {
      toast.error("failed to delte the bill", error);
    }
  };

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = searchText.trim()
          ? await searchRoutes("sales", searchText)
          : await salesDetail();

        const salesWithRefs = response.data.data.map((sale) => ({
          ...sale,
          ref: React.createRef(),
        }));

        setSales(salesWithRefs);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSales();
  }, [searchText]);

  return (
    <div className="">
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

      <div className="relative  ">
        <div className="static  top-0 left-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {sales.map((sale, saleIndex) => (
            <div
              key={sale.id}
              className="mb-6 p-4 bg-white shadow-xl rounded-2xl border-gray-200 border-2  flex flex-col justify-between"
            >
              <div className="mb-2 text-sm text-gray-500 ">
                <span>Sale ID: {sale.id}</span> |{" "}
                <span>Date: {new Date(sale.created_at).toLocaleString()}</span>
              </div>

              {/* {sale.items.slice(0, 3).map((item, itemIndex) => (
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
              ))} */}

              <div className="">
                <div className="">
                  <div
                    onClick={() => toggleBill(sale.id)}
                    className="cursor-pointer"
                  >
                    {(expandedBills[sale.id]
                      ? sale.items
                      : sale.items.slice(0, 3)
                    ).map((item) => (
                      <div
                        key={`${sale.id}-${item.item_id}`}
                        className="flex justify-between items-center border-b border-gray-300 py-3"
                      >
                        <div>
                          <h3 className="text-md font-medium">
                            {item.item_name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity} × Rs. {item.price}
                          </p>
                        </div>
                        <div className="text-md font-semibold">
                          Rs. {item.quantity * item.price}
                        </div>
                      </div>
                    ))}
                    {sale.items.length > 3 && !expandedBills[sale.id] && (
                      <div className="text-sm text-blue-600 mt-2">
                        Click to view more...
                      </div>
                    )}
                  </div>

                  <div className="">
                    <div className="flex justify-between text-lg font-bold  pt-3 mt-3">
                      <span>Total:</span>
                      <span>Rs. {sale.total_amount}</span>
                    </div>

                    <div className="mt-4 flex gap-2 print:hidden">
                      <button
                        className="px-4 py-2 border-2 rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(sale);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 bg-rose-600 border-2 border-rose-700 rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(sale.id);
                        }}
                      >
                        Delete
                      </button>

                      <button
                        className="px-4 py-2 bg-black text-white rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrint(sale.ref);
                        }}
                      >
                        Print
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesDetail;
