import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getRFQs } from "../../services/rfqService";
import { getVendors } from "../../services/vendorService";
import {
  createQuotation,
  getQuotations,
} from "../../services/quotationService";

const Quotations = () => {
  const [rfqs, setRfqs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({
    mode: "onTouched"
  });

  useEffect(() => {
    fetchRFQs();
    fetchVendors();
    fetchQuotations();
  }, []);

  const fetchRFQs = async () => {
    try {
      const res = await getRFQs();
      setRfqs(res.rfqs || []);
    } catch (error) {
      toast.error("Failed to load active requests (RFQs)");
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      setVendors(res.vendors || []);
    } catch (error) {
      toast.error("Failed to sync vendor directory index");
    }
  };

  const fetchQuotations = async () => {
    try {
      const res = await getQuotations();
      setQuotations(res.quotations || []);
    } catch (error) {
      toast.error("Failed to load global pricing ledger");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createQuotation(data);
      toast.success("Vendor Proposal Logged Successfully");
      reset();
      fetchQuotations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to catalog proposal metrics");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-slate-50/50 min-h-screen space-y-6 sm:space-y-8 antialiased">
      
      {/* Header Framework Block */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Quotation Management
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Log structural pricing estimations, incoming vendor rate sheets, and monitor anticipated freight fulfillment timelines.
        </p>
      </div>

      {/* Main Structural Responsive Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Side: Proposal Intake Control Engine Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Submit Vendor Quotation
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Selection Block: Linked RFQ Mapping */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Link Target RFQ</label>
              <select
                {...register("rfqId", { required: "A core reference request is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.rfqId 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              >
                <option value="">Select Associated RFQ</option>
                {rfqs.map((rfq) => (
                  <option key={rfq._id} value={rfq._id}>
                    {rfq.title}
                  </option>
                ))}
              </select>
              {errors.rfqId && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.rfqId.message}</p>
              )}
            </div>

            {/* Input Selection Block: Submitting Corporate Partner */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Submitting Vendor</label>
              <select
                {...register("vendorId", { required: "Vendor identity tracking verification is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.vendorId 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              >
                <option value="">Select Submitting Entity</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.companyName}
                  </option>
                ))}
              </select>
              {errors.vendorId && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.vendorId.message}</p>
              )}
            </div>

            {/* Input Numerical Block: Cost Valuation Frame */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Proposed Unit Price (INR)</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-sm font-semibold">₹</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("price", { 
                    required: "Financial cost specification required",
                    min: { value: 0.01, message: "Valuation parameter must be greater than zero" }
                  })}
                  className={`w-full border rounded-xl pl-9 pr-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                    errors.price 
                      ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                      : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.price.message}</p>
              )}
            </div>

            {/* Input Numerical Block: Temporal Delivery Matrix */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Delivery Timeframe</label>
              <div className="relative rounded-xl shadow-sm">
                <input
                  type="number"
                  placeholder="e.g., 7"
                  min="1"
                  {...register("deliveryDays", { 
                    required: "Turnaround scheduling estimation required",
                    min: { value: 1, message: "Fulfillment timeframe must take at least 1 working day" }
                  })}
                  className={`w-full border rounded-xl pr-16 pl-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                    errors.deliveryDays 
                      ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                      : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Days</span>
                </div>
              </div>
              {errors.deliveryDays && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.deliveryDays.message}</p>
              )}
            </div>

            {/* Input Text Block: Supplementary Contract Parameters */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Terms & Notes</label>
              <textarea
                placeholder="Include dynamic freight handling parameters, validity ceilings, or logistics conditions..."
                rows="3"
                {...register("notes")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm shadow-emerald-600/10 transition-all duration-150 active:scale-[0.99] mt-2 text-sm disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? "Processing Ledger Injection..." : "Log Vendor Proposal"}
            </button>
          </form>
        </div>

        {/* Right Side: Commercial Bid Registry Display Ledger Component */}
        <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Active Bids & Commercial Proposals
          </h2>

          {/* Desktop Visual Grid Matrix View */}
          <div className="overflow-x-auto -mx-5 sm:-mx-6 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-6">Linked RFQ</th>
                  <th className="py-3 px-6">Bidding Vendor</th>
                  <th className="py-3 px-6">Fulfillment Timeline</th>
                  <th className="py-3 px-6">Supplementary Notes</th>
                  <th className="py-3 px-6 text-right">Value (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {quotations.map((quotation) => (
                  <tr key={quotation._id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="py-4 px-6 font-bold text-slate-900 max-w-37.5 truncate">
                      {quotation.rfqId?.title || <span className="text-slate-400 italic font-normal">Archived Framework</span>}
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold">
                      {quotation.vendorId?.companyName || <span className="text-slate-400 italic font-normal">Unknown Partner</span>}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium text-xs">
                      {quotation.deliveryDays ? `${quotation.deliveryDays} Calendar Days` : "Immediate Execution"}
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-xs max-w-45 truncate">
                      {quotation.notes || <span className="italic text-slate-300">None Specified</span>}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-slate-900 tracking-tight">
                      ₹{Number(quotation.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Alternative Layout Engine View (< 768px viewports) */}
          <div className="md:hidden space-y-4">
            {quotations.map((quotation) => (
              <div key={quotation._id} className="border border-slate-100 rounded-xl p-4 space-y-3 bg-slate-50/40">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">
                      {quotation.rfqId?.title || "Archived Framework"}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Vendor: {quotation.vendorId?.companyName || "Unknown Partner"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-600 block">
                      ₹{Number(quotation.price || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 text-slate-600 border-t border-slate-100 pt-2.5 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fulfillment Period:</span>
                    <span className="text-slate-700 font-bold">
                      {quotation.deliveryDays ? `${quotation.deliveryDays} Days` : "Immediate Drop"}
                    </span>
                  </div>
                  {quotation.notes && (
                    <div className="bg-white border border-slate-100 p-2 rounded-lg text-[11px] text-slate-500 line-clamp-2 mt-1 font-normal">
                      <span className="font-semibold text-slate-400 block mb-0.5">Commercial Terms:</span>
                      {quotation.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {quotations.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-medium text-sm border-2 border-dashed border-slate-100 rounded-xl">
              📭 Zero active bidding portfolios matched current matrix sweeps.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Quotations;