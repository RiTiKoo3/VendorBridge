import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { createRFQ, getRFQs } from "../../services/rfqService";
import { getVendors } from "../../services/vendorService";

const RFQs = () => {
  const [vendors, setVendors] = useState([]);
  const [rfqs, setRfqs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched"
  });

  useEffect(() => {
    fetchVendors();
    fetchRFQs();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      setVendors(res.vendors || []);
    } catch (error) {
      toast.error("Failed to load active vendors directory");
    }
  };

  const fetchRFQs = async () => {
    try {
      const res = await getRFQs();
      setRfqs(res.rfqs || []);
    } catch (error) {
      toast.error("Failed to sync structural RFQ databases");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createRFQ(data);
      toast.success("RFQ Framework Dispatched Successfully");
      reset();
      fetchRFQs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to initialize Request matrix");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Safe formatting engine utility wrapper for backend timestamps
  const formatDeadlineDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-slate-50/50 min-h-screen space-y-6 sm:space-y-8 antialiased">
      
      {/* Dynamic Module Header Section */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          RFQ Management
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Draft Requests for Quotations, declare target operational required volumes, and monitor incoming bids.
        </p>
      </div>

      {/* Main Structural Layout Matrix Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Section Grid Unit: Creative Request Builder Component */}
        <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Create RFQ
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Element: Request Title Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">RFQ Title</label>
              <input
                type="text"
                placeholder="e.g., Procurement of Server Racks"
                {...register("title", { required: "Request framework identifier title is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.title 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.title && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.title.message}</p>
              )}
            </div>

            {/* Input Element: Numerical Allocations Unit Form Control */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quantity Required</label>
              <input
                type="number"
                placeholder="e.g., 500"
                min="1"
                {...register("quantity", { 
                  required: "Target operational volumes are required",
                  min: { value: 1, message: "Required allocation capacity must be at least 1 unit" }
                })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.quantity 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.quantity && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.quantity.message}</p>
              )}
            </div>

            {/* Input Element: Temporal Constraint Deadline Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Submission Deadline</label>
              <input
                type="date"
                {...register("deadline", { required: "Bidding lock window threshold is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.deadline 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.deadline && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.deadline.message}</p>
              )}
            </div>

            {/* Input Element: Target Enterprise Selector Dropdown Menu Control */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Vendor</label>
              <select
                {...register("vendorId", { required: "A verified system vendor link route is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.vendorId 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              >
                <option value="">Select Target Vendor Node</option>
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

            {/* Input Element: Technical Requirements Specification Text Area Block */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description & Specifications</label>
              <textarea
                placeholder="Provide micro material structural dimensions, guidelines, or conditions..."
                rows="4"
                {...register("description")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm shadow-emerald-600/10 transition-all duration-150 active:scale-[0.99] mt-2 text-sm disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? "Launching Tender Node..." : "Launch Request (RFQ)"}
            </button>
          </form>
        </div>

        {/* Right Section Grid Unit: Main Procurement Registry Dashboard Interface Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Active Request Registry
          </h2>

          {/* Viewport View Layout System A: High Density Desktop Spreadsheet Data Grid Matrix */}
          <div className="overflow-x-auto -mx-5 sm:-mx-6 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-6">RFQ Framework Title</th>
                  <th className="py-3 px-6">Assigned Supplier</th>
                  <th className="py-3 px-6">Required Volume</th>
                  <th className="py-3 px-6">Deadline Threshold</th>
                  <th className="py-3 px-6 text-right">Pipeline Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {rfqs.map((rfq) => (
                  <tr key={rfq._id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="py-4 px-6 font-bold text-slate-900 max-w-50 truncate">
                      {rfq.title}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {rfq.vendorId?.companyName || <span className="text-slate-400 italic">Unassigned Link</span>}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-800">
                      {rfq.quantity?.toLocaleString() || "0"} units
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium text-xs">
                      {formatDeadlineDate(rfq.deadline)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          rfq.status === "pending" || rfq.status === "open"
                            ? "bg-blue-50 text-blue-700 border border-blue-200/50"
                            : rfq.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {rfq.status || "Open"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Viewport View Layout System B: Adaptive Mobile Layout Stream Cards (< 768px Width) */}
          <div className="md:hidden space-y-4">
            {rfqs.map((rfq) => (
              <div key={rfq._id} className="border border-slate-100 rounded-xl p-4 space-y-3 bg-slate-50/40">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">{rfq.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Target: {rfq.vendorId?.companyName || "Unassigned Link"}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      rfq.status === "pending" || rfq.status === "open"
                        ? "bg-blue-50 text-blue-700 border border-blue-100"
                        : rfq.status === "completed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {rfq.status || "Open"}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-600 border-t border-slate-100 pt-2.5 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Required Volume:</span> 
                    <span className="font-bold text-slate-800">{rfq.quantity?.toLocaleString() || "0"} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deadline Threshold:</span> 
                    <span className="text-slate-500 font-bold">{formatDeadlineDate(rfq.deadline)}</span>
                  </div>
                  {rfq.description && (
                    <div className="bg-white border border-slate-100 p-2 rounded-lg text-[11px] text-slate-500 line-clamp-2 mt-1 font-normal">
                      {rfq.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {rfqs.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-medium text-sm border-2 border-dashed border-slate-100 rounded-xl">
              📭 NoRequests for Quotations matching active query metrics.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default RFQs;