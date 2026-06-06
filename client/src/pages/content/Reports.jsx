import { useEffect, useState } from "react";

import { getVendors } from "../../services/vendorService";
import { getRFQs } from "../../services/rfqService";
import { getQuotations } from "../../services/quotationService";
import { getApprovals } from "../../services/approvalService";
import { getPurchaseOrders } from "../../services/purchaseOrderService";
import { getInvoices } from "../../services/invoiceService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [stats, setStats] = useState({
    vendors: 0,
    rfqs: 0,
    quotations: 0,
    approvals: 0,
    purchaseOrders: 0,
    invoices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        vendors,
        rfqs,
        quotations,
        approvals,
        purchaseOrders,
        invoices,
      ] = await Promise.all([
        getVendors(),
        getRFQs(),
        getQuotations(),
        getApprovals(),
        getPurchaseOrders(),
        getInvoices(),
      ]);

      setStats({
        vendors: vendors?.vendors?.length || 0,
        rfqs: rfqs?.rfqs?.length || 0,
        quotations: quotations?.quotations?.length || 0,
        approvals: approvals?.approvals?.length || 0,
        purchaseOrders: purchaseOrders?.purchaseOrders?.length || 0,
        invoices: invoices?.invoices?.length || 0,
      });
    } catch (error) {
      console.error("Error aggregating analytical vectors:", error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: "Vendors", count: stats.vendors },
    { name: "RFQs", count: stats.rfqs },
    { name: "Quotations", count: stats.quotations },
    { name: "Approvals", count: stats.approvals },
    { name: "POs", count: stats.purchaseOrders },
    { name: "Invoices", count: stats.invoices },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-slate-50/50 min-h-screen space-y-6 sm:space-y-8 antialiased">
      
      {/* Module Header Block */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Reports & Analytics
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Real-time metrics, system-wide volume analysis, and operational pipeline health metrics.
        </p>
      </div>

      {/* KPI Dashboard Cards Grid System */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
        
        {/* Metric Node: Vendors */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Vendors</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 sm:mt-2 tracking-tight">
            {loading ? <span className="text-slate-200 animate-pulse">···</span> : stats.vendors}
          </p>
        </div>

        {/* Metric Node: RFQs */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">RFQs Sent</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 sm:mt-2 tracking-tight">
            {loading ? <span className="text-slate-200 animate-pulse">···</span> : stats.rfqs}
          </p>
        </div>

        {/* Metric Node: Quotations */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Quotations</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 sm:mt-2 tracking-tight">
            {loading ? <span className="text-slate-200 animate-pulse">···</span> : stats.quotations}
          </p>
        </div>

        {/* Metric Node: Approvals */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Approvals</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 sm:mt-2 tracking-tight">
            {loading ? <span className="text-slate-200 animate-pulse">···</span> : stats.approvals}
          </p>
        </div>

        {/* Metric Node: Purchase Orders */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">POs Issued</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 sm:mt-2 tracking-tight">
            {loading ? <span className="text-slate-200 animate-pulse">···</span> : stats.purchaseOrders}
          </p>
        </div>

        {/* Metric Node: Invoices */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Invoices</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 sm:mt-2 tracking-tight">
            {loading ? <span className="text-slate-200 animate-pulse">···</span> : stats.invoices}
          </p>
        </div>
      </div>

      {/* Primary Analytical Graphical Matrix Container */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Procurement Pipeline Volume
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
            Comparative balance matrix tracking items moving from RFQ generation to final invoice auditing.
          </p>
        </div>

        {/* Chart Dynamic Container Canvas */}
        <div className="w-full h-87.5 bg-slate-50/30 rounded-xl p-2 sm:p-4 border border-slate-100">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis 
                allowDecimals={false}
                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1e293b'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="#059669" 
                radius={[6, 6, 0, 0]} 
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Reports;