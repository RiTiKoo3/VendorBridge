import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getApprovals } from "../../services/approvalService";
import {
  createPurchaseOrder,
  getPurchaseOrders,
} from "../../services/purchaseOrderService";

const PurchaseOrders = () => {
  const [approvals, setApprovals] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
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
    fetchApprovals();
    fetchPurchaseOrders();
  }, []);

  const fetchApprovals = async () => {
    try {
      const res = await getApprovals();
      const approvedOnly = (res.approvals || []).filter(
        (item) => item.status === "approved"
      );
      setApprovals(approvedOnly);
    } catch (error) {
      toast.error("Failed to load approved compliance paths");
    }
  };

  const fetchPurchaseOrders = async () => {
    try {
      const res = await getPurchaseOrders();
      setPurchaseOrders(res.purchaseOrders || []);
    } catch (error) {
      toast.error("Failed to load dispatched purchase orders");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createPurchaseOrder(data);
      toast.success("Purchase Order Authorized & Dispatched");
      reset();
      fetchPurchaseOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to catalog purchase order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-slate-50/50 min-h-screen space-y-6 sm:space-y-8 antialiased">
      
      {/* Module Header Frame */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Purchase Orders
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Generate contractually binding procurement orders from verified compliance approvals and dispatch inventory request sheets.
        </p>
      </div>

      {/* Structural Adaptive Matrix Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Card Side: Interactive Procurement Form Controller Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Create Purchase Order
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Select Mapping Option Block: Compliance Approval Linkage */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Linked Compliance Approval
              </label>
              <select
                {...register("approvalId", { required: "Link reference to a verified approval node is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.approvalId 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              >
                <option value="">Select Compliance Reference</option>
                {approvals.map((approval) => (
                  <option key={approval._id} value={approval._id}>
                    {approval.quotationId?.vendorId?.companyName || "Vendor"} — ₹{Number(approval.quotationId?.price || 0).toLocaleString("en-IN")}
                  </option>
                ))}
              </select>
              {errors.approvalId && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.approvalId.message}</p>
              )}
            </div>

            {/* Input Selection Block: Procurement Tracking Serial Index Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                PO Tracking Number
              </label>
              <input
                type="text"
                placeholder="e.g., PO-2026-0001"
                {...register("poNumber", { 
                  required: "Tracking serial index assignment is required",
                  pattern: {
                    value: /^PO-\d{4}-\d+$/,
                    message: "Serial syntax structure must follow blueprint format (e.g., PO-2026-0001)"
                  }
                })}
                className={`w-full border rounded-xl px-4 py-2.5 font-mono text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.poNumber 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.poNumber && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.poNumber.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm shadow-emerald-600/10 transition-all duration-150 active:scale-[0.99] mt-2 text-sm disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? "Dispatched Transmission In Progress..." : "Authorize Purchase Order"}
            </button>
          </form>
        </div>

        {/* Right Card Side: Dispatched PO Database History Ledger System */}
        <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Dispatched PO Registry
          </h2>

          {/* Desktop Matrix View Configuration Layout Frame */}
          <div className="overflow-x-auto -mx-5 sm:-mx-6 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">PO Tracking Number</th>
                  <th className="py-3.5 px-6">Target Request (RFQ)</th>
                  <th className="py-3.5 px-6">Vendor Associate</th>
                  <th className="py-3.5 px-6">Total Value</th>
                  <th className="py-3.5 px-6 text-right">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {purchaseOrders.map((po) => (
                  <tr key={po._id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="py-4 px-6 font-mono font-bold text-emerald-700 text-xs tracking-wide">
                      {po.poNumber}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900 max-w-37.5 truncate">
                      {po.approvalId?.quotationId?.rfqId?.title || <span className="text-slate-400 font-normal italic text-xs">Standard Order</span>}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-semibold">
                      {po.approvalId?.quotationId?.vendorId?.companyName || <span className="text-slate-400 font-normal italic">Historical Source</span>}
                    </td>
                    <td className="py-4 px-6 font-black text-slate-900 tracking-tight">
                      ₹{Number(po.approvalId?.quotationId?.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        po.status === "completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : "bg-blue-50 text-blue-700 border-blue-200/60"
                      }`}>
                        {po.status || "Issued"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Adaptive Mobile Flow Component Stream View (< 768px Viewports) */}
          <div className="md:hidden space-y-4">
            {purchaseOrders.map((po) => (
              <div key={po._id} className="border border-slate-100 rounded-xl p-4 space-y-3 bg-slate-50/40">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-mono font-bold text-emerald-700 text-xs tracking-wide block mb-1">
                      {po.poNumber}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">
                      {po.approvalId?.quotationId?.rfqId?.title || "Standard Order"}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Vendor: {po.approvalId?.quotationId?.vendorId?.companyName || "Unknown Source"}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                    po.status === "completed"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-blue-50 text-blue-700 border-blue-100"
                  }`}>
                    {po.status || "Issued"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-2.5 font-medium">
                  <span className="text-slate-400">Total Operational Cost:</span>
                  <span className="text-slate-900 font-black text-sm tracking-tight">
                    ₹{Number(po.approvalId?.quotationId?.price || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Module Empty Display Screen Presentation */}
          {purchaseOrders.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-medium text-sm border-2 border-dashed border-slate-100 rounded-xl">
              📭 Zero active purchase tracking entries cleared current portfolio scans.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PurchaseOrders;