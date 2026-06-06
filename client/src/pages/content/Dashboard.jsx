import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRFQs } from "../../services/rfqService";
import { getApprovals } from "../../services/approvalService";
import { getPurchaseOrders } from "../../services/purchaseOrderService";
import { getInvoices } from "../../services/invoiceService";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    rfqs: 0,
    approvals: 0,
    invoices: 0,
    poValue: 0,
  });

  const [recentPOs, setRecentPOs] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [
        rfqsRes,
        approvalsRes,
        poRes,
        invoicesRes,
      ] = await Promise.all([
        getRFQs(),
        getApprovals(),
        getPurchaseOrders(),
        getInvoices(),
      ]);

      const totalPOValue = poRes.purchaseOrders.reduce(
        (sum, po) => sum + (po?.approvalId?.quotationId?.price || 0),
        0
      );

      setStats({
        rfqs: rfqsRes.rfqs.length,
        approvals: approvalsRes.approvals.length,
        invoices: invoicesRes.invoices.length,
        poValue: totalPOValue,
      });

      setRecentPOs(
        poRes.purchaseOrders
          .slice(-5)
          .reverse()
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-400 mx-auto bg-slate-50/50 min-h-screen space-y-8 antialiased">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-base text-slate-500 mt-1">
            Welcome back, <span className="font-medium text-slate-700">Procurement Officer</span>
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card: Active RFQs */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:border-slate-300">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Active RFQs
          </h3>
          <div className="flex items-baseline justify-between mt-4">
            <p className="text-3xl font-bold text-slate-900">
              {stats.rfqs}
            </p>
            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-md">Total Active</span>
          </div>
        </div>

        {/* Card: Pending Approvals */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:border-slate-300">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Pending Approvals
          </h3>
          <div className="flex items-baseline justify-between mt-4">
            <p className="text-3xl font-bold text-slate-900">
              {stats.approvals}
            </p>
            <span className="text-xs font-medium px-2 py-1 bg-amber-50 text-amber-700 rounded-md">Requires Action</span>
          </div>
        </div>

        {/* Card: PO Value */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:border-slate-300">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            PO Value
          </h3>
          <div className="flex items-baseline justify-between mt-4">
            <p className="text-3xl font-bold text-slate-900">
              ₹{stats.poValue.toLocaleString('en-IN')}
            </p>
            <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md">Net Value</span>
          </div>
        </div>

        {/* Card: Invoices */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:border-slate-300">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Invoices
          </h3>
          <div className="flex items-baseline justify-between mt-4">
            <p className="text-3xl font-bold text-slate-900">
              {stats.invoices}
            </p>
            <span className="text-xs font-medium px-2 py-1 bg-purple-50 text-purple-700 rounded-md">Logged</span>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Purchase Orders */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 shadow-sm rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Recent Purchase Orders
            </h2>
            <div className="overflow-x-auto -mx-6">
              <table className="w-full min-w-125 border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-6">PO Number</th>
                    <th className="py-3 px-6">Vendor</th>
                    <th className="py-3 px-6 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-base text-slate-700">
                  {recentPOs.map((po) => (
                    <tr key={po._id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3.5 px-6 font-medium">
                        <button
                          onClick={() => navigate("/purchase-orders")}
                          className="text-blue-600 hover:text-blue-700 hover:underline transition font-semibold"
                        >
                          {po.poNumber}
                        </button>
                      </td>
                      <td className="py-3.5 px-6 truncate max-w-55">
                        {po.approvalId?.quotationId?.vendorId?.companyName || "N/A"}
                      </td>
                      <td className="py-3.5 px-6 text-right font-medium text-slate-900">
                        ₹{(po.approvalId?.quotationId?.price || 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}

                  {recentPOs.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-10 text-slate-400 font-medium">
                        No Recent Purchase Orders Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Quick Insights
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-base font-semibold text-blue-900">
              <span>RFQs Created</span>
              <span className="bg-blue-600 text-white px-3 py-0.5 rounded-full text-sm font-bold">{stats.rfqs}</span>
            </div>

            <div className="flex justify-between items-center bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 text-base font-semibold text-emerald-900">
              <span>Approvals Logged</span>
              <span className="bg-emerald-600 text-white px-3 py-0.5 rounded-full text-sm font-bold">{stats.approvals}</span>
            </div>

            <div className="flex justify-between items-center bg-amber-50/60 border border-amber-100 rounded-xl p-4 text-base font-semibold text-amber-900">
              <span>Invoices Processed</span>
              <span className="bg-amber-600 text-white px-3 py-0.5 rounded-full text-sm font-bold">{stats.invoices}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Procurement Workflow Flowchart */}
      <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Procurement Process Pipeline
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {["Vendors", "RFQs", "Quotations", "Comparison", "Approvals", "Purchase Orders", "Invoices"].map((step, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200/70 p-3 rounded-lg text-center font-medium text-slate-700 text-sm flex items-center justify-center min-h-12.5">
              {step}
            </div>
          ))}
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold p-3 rounded-lg text-center text-sm flex items-center justify-center min-h-12.5 uppercase tracking-wide">
            Completed
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/rfqs")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm shadow-emerald-600/10 active:scale-[0.98]"
          >
            Create RFQ
          </button>

          <button
            onClick={() => navigate("/vendors")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm shadow-blue-600/10 active:scale-[0.98]"
          >
            Add Vendor
          </button>

          <button
            onClick={() => navigate("/invoices")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm shadow-purple-600/10 active:scale-[0.98]"
          >
            View Invoices
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;