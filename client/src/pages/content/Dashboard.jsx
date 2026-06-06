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
  const [activeSegment, setActiveSegment] = useState(null);

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
      console.error("Dashboard metric resolution failure:", error);
    }
  };

  // Safe calculation parameters for our embedded interactive chart component
  const totalItems = stats.rfqs + stats.approvals + stats.invoices;
  
  const segments = [
    { label: "RFQs Created", value: stats.rfqs, color: "#2563eb", strokeDash: "bg-blue-600" },
    { label: "Approvals Logged", value: stats.approvals, color: "#059669", strokeDash: "bg-emerald-600" },
    { label: "Invoices Logged", value: stats.invoices, color: "#d97706", strokeDash: "bg-amber-600" }
  ];

  // Map out trigonometric SVG radial offsets mathematically without external graphing library bloat
  let accumulatedPercentage = 0;
  const computedSegments = segments.map(seg => {
    const percentage = totalItems > 0 ? (seg.value / totalItems) * 100 : 0;
    const startAngle = (accumulatedPercentage * 360) / 100;
    accumulatedPercentage += percentage;
    return { ...seg, percentage, startAngle };
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-slate-50/50 min-h-screen space-y-6 sm:space-y-8 antialiased">
      
      {/* Structural Header Context block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            System Operations Dashboard
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Welcome back, <span className="font-bold text-slate-800">Procurement Officer</span>
          </p>
        </div>
        <div className="text-xs sm:text-sm font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 self-start sm:self-center">
          ERP Domain Workspace • Active Session
        </div>
      </div>

      {/* KPI Numerical Operational Display Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card component: Active structural RFQs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active RFQs</h3>
          <div className="flex items-baseline justify-between mt-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.rfqs}</p>
            <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">Live Pipelines</span>
          </div>
        </div>

        {/* Card component: Pending verification Approvals */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Approvals</h3>
          <div className="flex items-baseline justify-between mt-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.approvals}</p>
            <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">Action Required</span>
          </div>
        </div>

        {/* Card component: System Financial Value aggregation */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aggregated PO Value</h3>
          <div className="flex items-baseline justify-between mt-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 truncate max-w-45">
              ₹{stats.poValue.toLocaleString('en-IN')}
            </p>
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">Net Ledger</span>
          </div>
        </div>

        {/* Card component: Logged Supplier Invoices */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Invoices Processed</h3>
          <div className="flex items-baseline justify-between mt-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.invoices}</p>
            <span className="text-xs font-bold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg border border-purple-100">Settlements</span>
          </div>
        </div>
      </div>

      {/* Main Core Section Layout wrapper split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Core Component Block: Data Table Grid view */}
        <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Recent Purchase Orders
              </h2>
              <button 
                onClick={() => navigate("/purchase-orders")}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
              >
                View Ledger &rarr;
              </button>
            </div>
            
            {/* Table wrapper containing specific layout responsive switches */}
            <div className="overflow-x-auto -mx-5 sm:-mx-6">
              <table className="w-full min-w-125 border-collapse text-left hidden sm:table">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-6">PO Reference Number</th>
                    <th className="py-3 px-6">Associated Vendor Entity</th>
                    <th className="py-3 px-6 text-right">Settlement Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {recentPOs.map((po) => (
                    <tr key={po._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-3.5 px-6 font-semibold text-emerald-600">
                        <button
                          onClick={() => navigate("/purchase-orders")}
                          className="hover:text-emerald-700 hover:underline transition text-left"
                        >
                          {po.poNumber}
                        </button>
                      </td>
                      <td className="py-3.5 px-6 truncate max-w-55 font-medium text-slate-600">
                        {po.approvalId?.quotationId?.vendorId?.companyName || "Unassigned Operational Unit"}
                      </td>
                      <td className="py-3.5 px-6 text-right font-bold text-slate-900">
                        ₹{(po.approvalId?.quotationId?.price || 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Handheld Device Block Layout Switcher */}
              <div className="sm:hidden divide-y divide-slate-100 px-5">
                {recentPOs.map((po) => (
                  <div key={po._id} className="py-4 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => navigate("/purchase-orders")}
                        className="font-bold text-emerald-600 text-sm"
                      >
                        {po.poNumber}
                      </button>
                      <span className="font-bold text-slate-900 text-sm">
                        ₹{(po.approvalId?.quotationId?.price || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-400 truncate">
                      {po.approvalId?.quotationId?.vendorId?.companyName || "Unassigned Operational Unit"}
                    </div>
                  </div>
                ))}
              </div>

              {recentPOs.length === 0 && (
                <div className="text-center py-12 text-slate-400 font-medium text-sm">
                  📭 Zero active records found inside systemic loop buffers.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Core Component Block: Upgraded Custom Interactive Chart UI */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1">
              Quick Insights
            </h2>
            <p className="text-xs font-medium text-slate-400 mb-6">
              Distribution proportions of dynamic tracking metrics.
            </p>

            {totalItems > 0 ? (
              <div className="flex flex-col items-center justify-center py-2 space-y-6">
                {/* Embedded SVG Pie Layout Core Context Graphic */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                    {computedSegments.map((seg, index) => {
                      // Circumference of circles mapped with base radius value parameters = 15.91549430918954
                      // Meaning Circumference equals exactly 100 allocation parameters
                      const strokeDasharray = `${seg.percentage} ${100 - seg.percentage}`;
                      const strokeDashoffset = 100 - seg.startAngle;
                      
                      return (
                        <circle
                          key={index}
                          cx="21"
                          cy="21"
                          r="15.91549430918954"
                          fill="transparent"
                          stroke={seg.color}
                          strokeWidth={activeSegment === index ? "4.5" : "3.5"}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-200 cursor-pointer origin-center"
                          onMouseEnter={() => setActiveSegment(index)}
                          onMouseLeave={() => setActiveSegment(null)}
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Dynamic internal text overlay layer */}
                  <div className="absolute flex flex-col items-center justify-center text-center bg-white rounded-full w-28 h-28 shadow-inner border border-slate-50">
                    <span className="text-2xl font-black text-slate-800">
                      {activeSegment !== null ? computedSegments[activeSegment].value : totalItems}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide px-2 truncate max-w-25">
                      {activeSegment !== null ? computedSegments[activeSegment].label : "Total Records"}
                    </span>
                  </div>
                </div>

                {/* Legend Grid Display Mapping Elements */}
                <div className="w-full space-y-2.5">
                  {computedSegments.map((seg, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-2 rounded-xl transition-colors duration-150 ${
                        activeSegment === index ? 'bg-slate-50' : 'bg-transparent'
                      }`}
                      onMouseEnter={() => setActiveSegment(index)}
                      onMouseLeave={() => setActiveSegment(null)}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-3 h-3 rounded-full shrink-0 ${seg.strokeDash}`}></span>
                        <span className="text-sm font-semibold text-slate-600">{seg.label}</span>
                      </div>
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                        <span>{seg.value}</span>
                        <span className="text-xs font-medium text-slate-400">({seg.percentage.toFixed(0)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">📊</div>
                <p className="text-sm font-semibold">Awaiting structural pipeline data resolution parameters...</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Procurement Workflow Pipeline Component */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-5">
          Procurement Process Pipeline
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {["Vendors", "RFQs", "Quotations", "Comparison", "Approvals", "Purchase Orders", "Invoices"].map((step, idx) => (
            <div key={idx} className="bg-slate-50/50 border border-slate-200/80 p-3 rounded-xl text-center font-semibold text-slate-600 text-xs sm:text-sm flex items-center justify-center min-h-12.5 shadow-sm">
              {step}
            </div>
          ))}
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold p-3 rounded-xl text-center text-xs sm:text-sm flex items-center justify-center min-h-12.5 uppercase tracking-wider shadow-sm">
            Completed
          </div>
        </div>
      </div>

      {/* System Action Matrix Routers */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4">
          Quick Actions Portal
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <button
            onClick={() => navigate("/rfqs")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm shadow-emerald-600/10 transition duration-150 active:scale-[0.99] text-sm"
          >
            Create RFQ
          </button>

          <button
            onClick={() => navigate("/vendors")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm shadow-blue-600/10 transition duration-150 active:scale-[0.99] text-sm"
          >
            Add Vendor
          </button>

          <button
            onClick={() => navigate("/invoices")}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm shadow-amber-600/10 transition duration-150 active:scale-[0.99] text-sm"
          >
            View Invoices
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition duration-150 active:scale-[0.99] text-sm"
          >
            View System Reports
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;