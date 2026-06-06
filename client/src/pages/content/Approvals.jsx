import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getQuotations } from "../../services/quotationService";
import {
  createApproval,
  getApprovals,
} from "../../services/approvalService";

const Approvals = () => {
  const [quotations, setQuotations] = useState([]);
  const [approvals, setApprovals] = useState([]);
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
    fetchQuotations();
    fetchApprovals();
  }, []);

  const fetchQuotations = async () => {
    try {
      const res = await getQuotations();
      setQuotations(res.quotations || []);
    } catch (error) {
      toast.error("Failed to load global quotation ledger");
    }
  };

  const fetchApprovals = async () => {
    try {
      const res = await getApprovals();
      setApprovals(res.approvals || []);
    } catch (error) {
      toast.error("Failed to load operational compliance records");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createApproval(data);
      toast.success("Compliance Validation Workflow Committed");
      reset();
      fetchApprovals();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to commit sign-off sequence");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-slate-50/50 min-h-screen space-y-6 sm:space-y-8 antialiased">
      
      {/* Structural Header Framework */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Approval Management
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Review commercial bids, execute sign-off protocols, and audit enterprise financial compliance loops.
        </p>
      </div>

      {/* Main Split Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Side Section: Interactive Workflow Provisioner Form */}
        <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Initialize Workflow State
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Select Option Block: Quotation Mapping */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Target Quotation & Value
              </label>
              <select
                {...register("quotationId", { required: "A core vendor reference bid link is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.quotationId 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              >
                <option value="">Select Quotation Identifier</option>
                {quotations.map((quotation) => (
                  <option key={quotation._id} value={quotation._id}>
                    {quotation.vendorId?.companyName || "Unknown"} — ₹{Number(quotation.price || 0).toLocaleString("en-IN")}
                  </option>
                ))}
              </select>
              {errors.quotationId && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.quotationId.message}</p>
              )}
            </div>

            {/* Input Select Option Block: Compliance Status Directive */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Executive Compliance Action
              </label>
              <select
                {...register("status", { required: "Compliance assessment resolution status is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.status 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              >
                <option value="">Select Target Status State</option>
                <option value="pending">⏳ Pending Verification</option>
                <option value="approved">✅ Approved / Sign-Off Completed</option>
                <option value="rejected">❌ Rejected / Compliance Hold</option>
              </select>
              {errors.status && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.status.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm shadow-emerald-600/10 transition-all duration-150 active:scale-[0.99] mt-2 text-sm disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? "Syncing Global Workflow State..." : "Commit Compliance Status"}
            </button>
          </form>
        </div>

        {/* Right Side Section: Master Compliance Auditing Dashboard Registry */}
        <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Compliance & Sign-off Registry
          </h2>

          {/* Desktop Visual Grid Matrix View */}
          <div className="overflow-x-auto -mx-5 sm:-mx-6 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Linked RFQ</th>
                  <th className="py-3.5 px-6">Vendor Partner</th>
                  <th className="py-3.5 px-6">Total Evaluated Value</th>
                  <th className="py-3.5 px-6 text-right">Approval Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {approvals.map((approval) => (
                  <tr key={approval._id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="py-4 px-6 font-bold text-slate-900 max-w-45 truncate">
                      {approval.quotationId?.rfqId?.title || <span className="text-slate-400 font-normal italic text-xs">Direct Core Review</span>}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-semibold">
                      {approval.quotationId?.vendorId?.companyName || <span className="text-slate-400 font-normal italic">Historical Instance</span>}
                    </td>
                    <td className="py-4 px-6 font-black text-slate-900 tracking-tight">
                      ₹{Number(approval.quotationId?.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          approval.status === "approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            : approval.status === "rejected"
                            ? "bg-red-50 text-red-700 border-red-200/60"
                            : "bg-amber-50 text-amber-700 border-amber-200/60"
                        }`}
                      >
                        {approval.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Alternative Adaptive Stream Layout Components */}
          <div className="md:hidden space-y-4">
            {approvals.map((approval) => (
              <div key={approval._id} className="border border-slate-100 rounded-xl p-4 space-y-3 bg-slate-50/40">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">
                      {approval.quotationId?.rfqId?.title || "Direct Core Review"}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Partner: {approval.quotationId?.vendorId?.companyName || "Unknown Source"}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                      approval.status === "approved"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : approval.status === "rejected"
                        ? "bg-red-50 text-red-700 border-red-100"
                        : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}
                  >
                    {approval.status || "Pending"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-2.5 font-medium">
                  <span className="text-slate-400">Total Evaluated Value:</span>
                  <span className="text-slate-900 font-black text-sm tracking-tight">
                    ₹{Number(approval.quotationId?.price || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Module Empty State Presentation Matrix */}
          {approvals.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-medium text-sm border-2 border-dashed border-slate-100 rounded-xl">
              📭 Zero active workflow validation states found inside database directories.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Approvals;