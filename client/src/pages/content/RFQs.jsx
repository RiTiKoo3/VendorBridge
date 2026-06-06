import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { createRFQ, getRFQs } from "../../services/rfqService";
import { getVendors } from "../../services/vendorService";

const RFQs = () => {
  const [vendors, setVendors] = useState([]);
  const [rfqs, setRfqs] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetchVendors();
    fetchRFQs();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      setVendors(res.vendors);
    } catch (error) {
      toast.error("Failed to load vendors");
    }
  };

  const fetchRFQs = async () => {
    try {
      const res = await getRFQs();
      setRfqs(res.rfqs);
    } catch (error) {
      toast.error("Failed to load RFQs");
    }
  };

  const onSubmit = async (data) => {
    try {
      await createRFQ(data);
      toast.success("RFQ Created");
      reset();
      fetchRFQs();
    } catch (error) {
      toast.error("Failed to create RFQ");
    }
  };

  return (
    <div className="p-6 max-w-400 mx-auto bg-slate-50/50 min-h-screen space-y-8 antialiased">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          RFQ Management
        </h1>
        <p className="text-base text-slate-500 mt-1">
          Draft Requests for Quotations, declare required volumes, and monitor incoming bids.
        </p>
      </div>

      {/* Main Grid Split Workspace */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Form Panel */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            Create RFQ
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">RFQ Title</label>
              <input
                type="text"
                placeholder="e.g., Procurement of Server Racks"
                {...register("title")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quantity Required</label>
              <input
                type="number"
                placeholder="0"
                {...register("quantity")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Submission Deadline</label>
              <input
                type="date"
                {...register("deadline")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Vendor</label>
              <select
                {...register("vendorId")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base bg-slate-50/30 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150"
              >
                <option value="">Select Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.companyName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description & Specifications</label>
              <textarea
                placeholder="Provide detailed material guidelines..."
                rows="4"
                {...register("description")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm shadow-emerald-600/10 transition-all duration-150 active:scale-[0.99] mt-2"
            >
              Launch Request (RFQ)
            </button>
          </form>
        </div>

        {/* Right Data Table Panel */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            Active Request Registry
          </h2>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-6">RFQ Title</th>
                  <th className="py-3 px-6">Assigned Vendor</th>
                  <th className="py-3 px-6">Quantity</th>
                  <th className="py-3 px-6">Deadline</th>
                  <th className="py-3 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-base text-slate-700">
                {rfqs.map((rfq) => (
                  <tr key={rfq._id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {rfq.title}
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {rfq.vendorId?.companyName || <span className="text-slate-400 italic">Unassigned</span>}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800">
                      {rfq.quantity?.toLocaleString() || "0"} units
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-sm">
                      {new Date(rfq.deadline).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
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

                {rfqs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-slate-400 font-medium bg-slate-50/10">
                      No requests for quotations logged yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RFQs;