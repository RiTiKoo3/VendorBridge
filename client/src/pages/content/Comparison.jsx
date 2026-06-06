import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getQuotations } from "../../services/quotationService";

const Comparison = () => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const res = await getQuotations();
      setQuotations(res.quotations);
    } catch (error) {
      toast.error("Failed to load quotations");
    }
  };

  const lowestPrice =
    quotations.length > 0
      ? Math.min(...quotations.map((q) => q.price))
      : 0;

  const handleSelectVendor = (quotation) => {
    toast.success(
      `${quotation.vendorId?.companyName} Selected`
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Quotation Comparison
      </h1>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Compare Vendor Quotations
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-3">RFQ</th>
                <th className="border p-3">Vendor</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Delivery</th>
                <th className="border p-3">Notes</th>
                <th className="border p-3">Best Offer</th>
                <th className="border p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {quotations.map((quotation) => (
                <tr
                  key={quotation._id}
                  className={
                    quotation.price === lowestPrice
                      ? "bg-green-100"
                      : ""
                  }
                >
                  <td className="border p-3">
                    {quotation.rfqId?.title}
                  </td>

                  <td className="border p-3">
                    {quotation.vendorId?.companyName}
                  </td>

                  <td className="border p-3">
                    ₹ {quotation.price}
                  </td>

                  <td className="border p-3">
                    {quotation.deliveryDays} Days
                  </td>

                  <td className="border p-3">
                    {quotation.notes}
                  </td>

                  <td className="border p-3">
                    {quotation.price === lowestPrice ? (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                        Lowest Price
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="border p-3">
                    <button
                      onClick={() =>
                        handleSelectVendor(
                          quotation
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {quotations.length === 0 && (
            <p className="text-center py-6 text-slate-500">
              No quotations found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comparison;