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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
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
        vendors: vendors.vendors.length,
        rfqs: rfqs.rfqs.length,
        quotations: quotations.quotations.length,
        approvals: approvals.approvals.length,
        purchaseOrders:
          purchaseOrders.purchaseOrders.length,
        invoices: invoices.invoices.length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = [
    {
      name: "Vendors",
      count: stats.vendors,
    },
    {
      name: "RFQs",
      count: stats.rfqs,
    },
    {
      name: "Quotes",
      count: stats.quotations,
    },
    {
      name: "Approvals",
      count: stats.approvals,
    },
    {
      name: "POs",
      count: stats.purchaseOrders,
    },
    {
      name: "Invoices",
      count: stats.invoices,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Reports & Analytics
      </h1>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Vendors
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.vendors}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            RFQs
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.rfqs}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Quotations
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.quotations}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Approvals
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.approvals}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Purchase Orders
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.purchaseOrders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Invoices
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.invoices}
          </p>
        </div>
      </div>

      {/* Chart */}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-6">
          Procurement Overview
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;