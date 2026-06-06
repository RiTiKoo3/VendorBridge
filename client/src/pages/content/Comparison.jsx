import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getQuotations } from "../../services/quotationService";

const Comparison = () => {
  const [quotations, setQuotations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setIsLoading(true);
    try {
      const res = await getQuotations();
      setQuotations(res.quotations || []);
    } catch (error) {
      toast.error("Failed to load global quotation comparison matrix");
    } finally {
      setIsLoading(false);
    }
  };

  // Maps the lowest cost threshold dynamically per unique RFQ ID framework assignment
  const getLowestPricesByRFQ = () => {
    const rfqPriceMap = {};
    quotations.forEach((q) => {
      const rfqId = q.rfqId?._id;
      if (!rfqId) return;
      if (rfqPriceMap[rfqId] === undefined || q.price < rfqPriceMap[rfqId]) {
        rfqPriceMap[rfqId] = q.price;
      }
    });
    return rfqPriceMap;
  };

  const lowestPricesByRFQ = getLowestPricesByRFQ();

  const handleSelectVendor = (quotation) => {
    const vendorName = quotation.vendorId?.companyName || "Selected Vendor";
    toast.success(`Procurement path locked: ${vendorName} chosen`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-slate-50/50 min-h-screen space-y-6 sm:space-y-8 antialiased">
      
      {/* Structural Module Header Block */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Quotation Comparison
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Analyze competing vendor parameters side-by-side and isolate ideal cost thresholds automatically.
        </p>
      </div>

      {/* Primary Analytics Card Sheet Wrapper */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Compare Vendor Quotations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Highlighting target low-cost options relative to individual sourcing objectives.
            </p>
          </div>
          {quotations.length > 0 && (
            <span className="self-start sm:self-center text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200/40">
              {quotations.length} Active Proposals Loaded
            </span>
          )}
        </div>

        {/* Viewport View Layout System A: High Density Desktop Spreadsheet Data Grid Matrix */}
        <div className="overflow-x-auto -mx-5 sm:-mx-6 hidden md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Linked RFQ</th>
                <th className="py-3.5 px-6">Vendor Partner</th>
                <th className="py-3.5 px-6">Fulfillment Duration</th>
                <th className="py-3.5 px-6">Supplementary Notes</th>
                <th className="py-3.5 px-6">Best Offer Status</th>
                <th className="py-3.5 px-6">Quoted Price (INR)</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {quotations.map((quotation) => {
                const currentRfqId = quotation.rfqId?._id;
                const isLowest = currentRfqId && quotation.price === lowestPricesByRFQ[currentRfqId];

                return (
                  <tr 
                    key={quotation._id} 
                    className={`transition-colors duration-150 group ${
                      isLowest 
                        ? "bg-emerald-50/40 hover:bg-emerald-50/80 font-medium" 
                        : "hover:bg-slate-50/40"
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-slate-900 max-w-37.5 truncate">
                      {quotation.rfqId?.title || <span className="text-slate-400 italic font-normal text-xs">Archived RFQ</span>}
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold">
                      {quotation.vendorId?.companyName || <span className="text-slate-400 italic font-normal">Unknown Vendor</span>}
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium text-xs">
                      {quotation.deliveryDays ? `${quotation.deliveryDays} Calendar Days` : "Immediate Drop"}
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-xs max-w-45 truncate">
                      {quotation.notes || <span className="text-slate-300 italic">None Specified</span>}
                    </td>
                    <td className="py-4 px-6">
                      {isLowest ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Best Offer
                        </span>
                      ) : (
                        <span className="text-slate-300 font-medium text-sm pl-4">-</span>
                      )}
                    </td>
                    <td className={`py-4 px-6 font-black tracking-tight text-base ${isLowest ? "text-emerald-700" : "text-slate-900"}`}>
                      ₹{Number(quotation.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleSelectVendor(quotation)}
                        className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-150 shadow-sm active:scale-[0.98] ${
                          isLowest
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/10"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900"
                        }`}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Viewport View Layout System B: Adaptive Mobile Layout Stream Cards (< 768px Width) */}
        <div className="md:hidden space-y-4">
          {quotations.map((quotation) => {
            const currentRfqId = quotation.rfqId?._id;
            const isLowest = currentRfqId && quotation.price === lowestPricesByRFQ[currentRfqId];

            return (
              <div 
                key={quotation._id} 
                className={`border rounded-xl p-4 space-y-3 transition-colors ${
                  isLowest 
                    ? "bg-emerald-50/20 border-emerald-200" 
                    : "bg-slate-50/40 border-slate-100"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Linked Requirement</span>
                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">
                      {quotation.rfqId?.title || "Archived RFQ"}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Partner: {quotation.vendorId?.companyName || "Unknown Vendor"}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className={`text-base font-black tracking-tight ${isLowest ? "text-emerald-600" : "text-slate-900"}`}>
                      ₹{Number(quotation.price || 0).toLocaleString("en-IN")}
                    </span>
                    {isLowest && (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        Best Offer
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs space-y-1.5 text-slate-600 border-t border-slate-100 pt-3 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fulfillment Period:</span>
                    <span className="text-slate-700 font-bold">
                      {quotation.deliveryDays ? `${quotation.deliveryDays} Calendar Days` : "Immediate Delivery"}
                    </span>
                  </div>
                  {quotation.notes && (
                    <div className="bg-white border border-slate-100 p-2 rounded-lg text-[11px] text-slate-500 line-clamp-2 mt-1 font-normal">
                      {quotation.notes}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleSelectVendor(quotation)}
                    className={`w-full text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-150 text-center shadow-sm ${
                      isLowest
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    Award Contract Sourcing Route
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State Presentation Layer */}
        {!isLoading && quotations.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-medium text-sm border-2 border-dashed border-slate-100 rounded-xl">
            📭 No vendor quotations found to generate side-by-side matrices.
          </div>
        )}

        {/* Skeleton Component State Layer */}
        {isLoading && (
          <div className="text-center py-12 text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            Syncing Comparative Valuation Matrices...
          </div>
        )}
      </div>

    </div>
  );
};

export default Comparison;