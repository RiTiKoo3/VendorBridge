import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { getPurchaseOrders } from "../../services/purchaseOrderService";
import { createInvoice, getInvoices } from "../../services/invoiceService";

const Invoices = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    fetchPurchaseOrders();
    fetchInvoices();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const res = await getPurchaseOrders();
      setPurchaseOrders(res.purchaseOrders || []);
    } catch (error) {
      toast.error("Failed to load authorized purchase orders");
    }
  };

  const fetchInvoices = async () => {
    try {
      const res = await getInvoices();
      setInvoices(res.invoices || []);
    } catch (error) {
      toast.error("Failed to load active billing registry ledger");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createInvoice(data);
      toast.success("Financial Invoice Record Compiled");
      reset();
      fetchInvoices();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to catalog billing instance",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-slate-50/50 min-h-screen space-y-6 sm:space-y-8 antialiased">
      {/* Structural Module Header Block */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Invoice Management
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Generate financial invoices against authorized purchase orders and
          keep track of pending payment settlements.
        </p>
      </div>

      {/* Primary Split Grid Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Side Form Section: Interactive Creation Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Create Invoice Record
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Selection Block: Source Purchase Order Link */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Source Purchase Order
              </label>
              <select
                {...register("purchaseOrderId", {
                  required:
                    "Link assignment to an approved PO tracking node is required",
                })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.purchaseOrderId
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10"
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              >
                <option value="">Select Purchase Order</option>
                {purchaseOrders.map((po) => (
                  <option key={po._id} value={po._id}>
                    {po.poNumber}{" "}
                    {po.approvalId?.quotationId?.vendorId?.companyName
                      ? `(${po.approvalId.quotationId.vendorId.companyName})`
                      : ""}
                  </option>
                ))}
              </select>
              {errors.purchaseOrderId && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">
                  ⚠️ {errors.purchaseOrderId.message}
                </p>
              )}
            </div>

            {/* Input Control Block: Invoice Number Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Invoice Reference Number
              </label>
              <input
                type="text"
                placeholder="e.g., INV-2026-8841"
                {...register("invoiceNumber", {
                  required:
                    "Unique identifier indexing string allocation is required",
                  pattern: {
                    value: /^INV-\d{4}-\d+$/,
                    message:
                      "Serial syntax structure must follow blueprint format (e.g., INV-2026-8841)",
                  },
                })}
                className={`w-full border rounded-xl px-4 py-2.5 font-mono text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.invoiceNumber
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10"
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.invoiceNumber && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">
                  ⚠️ {errors.invoiceNumber.message}
                </p>
              )}
            </div>

            {/* Input Amount Pricing Selector Group */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Billed Amount (INR)
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-sm font-bold">₹</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("amount", {
                    required:
                      "Financial statement value designation is required",
                    min: {
                      value: 0.01,
                      message:
                        "Billed values must exceed zero evaluation thresholds",
                    },
                  })}
                  className={`w-full border rounded-xl pl-9 pr-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                    errors.amount
                      ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10"
                      : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">
                  ⚠️ {errors.amount.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm shadow-emerald-600/10 transition-all duration-150 active:scale-[0.99] mt-2 text-sm disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting
                ? "Processing Ledger Sequence..."
                : "Commit Invoice File"}
            </button>
          </form>
        </div>

        {/* Right Side Table Section: Active Billing Directory Ledger */}
        <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Active Billing Ledger
          </h2>

          {/* Large Viewport Data Matrix Spreadsheet Integration System */}
          <div className="overflow-x-auto -mx-5 sm:-mx-6 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Invoice Identifier</th>
                  <th className="py-3.5 px-6">Associated PO</th>
                  <th className="py-3.5 px-6">Vendor Beneficiary</th>
                  <th className="py-3.5 px-6">Statement Value</th>
                  <th className="py-3.5 px-6">Process Status</th>
                  <th className="py-3.5 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice._id}
                    className="hover:bg-slate-50/40 transition-colors group"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-slate-900 text-xs tracking-wide">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="py-4 px-6 font-mono text-emerald-700 text-xs font-bold">
                      {invoice.purchaseOrderId?.poNumber || (
                        <span className="text-slate-400 font-normal italic text-xs">
                          Direct Link
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-semibold max-w-37.5 truncate">
                      {invoice.purchaseOrderId?.approvalId?.quotationId
                        ?.vendorId?.companyName || (
                        <span className="text-slate-400 font-normal italic">
                          Historical Stream
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-black text-slate-900 tracking-tight">
                      ₹
                      {Number(invoice.amount || 0).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          invoice.status === "unpaid"
                            ? "bg-amber-50 text-amber-700 border-amber-200/60"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        }`}
                      >
                        {invoice.status || "Settled"}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <button
                        onClick={() => {
                          toast.success("Preparing Invoice Print View");
                          window.print();
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Layout Fallback Stream Block Interface Elements (< 768px Width) */}
          <div className="md:hidden space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice._id}
                className="border border-slate-100 rounded-xl p-4 space-y-3 bg-slate-50/40"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-mono font-bold text-slate-900 text-xs tracking-wide block mb-1">
                      {invoice.invoiceNumber}
                    </span>
                    <p className="text-xs text-slate-500 font-semibold">
                      PO Link:{" "}
                      <span className="font-mono text-emerald-700 font-bold">
                        {invoice.purchaseOrderId?.poNumber || "Direct"}
                      </span>
                    </p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Vendor:{" "}
                      {invoice.purchaseOrderId?.approvalId?.quotationId
                        ?.vendorId?.companyName || "Unknown"}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                      invoice.status === "unpaid"
                        ? "bg-amber-50 text-amber-700 border-amber-100"
                        : "bg-emerald-50 text-emerald-700 border-emerald-100"
                    }`}
                  >
                    {invoice.status || "Settled"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-2.5 font-medium">
                  <span className="text-slate-400">
                    Statement Amount Value:
                  </span>
                  <span className="text-slate-900 font-black text-sm tracking-tight">
                    ₹{Number(invoice.amount || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Core Module Empty Configuration View */}
          {invoices.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-medium text-sm border-2 border-dashed border-slate-100 rounded-xl">
              📭 Zero active billing statements filed within current
              directories.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
