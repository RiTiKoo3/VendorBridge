// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Login from "../pages/authpages/Login";
// import Dashboard from "../pages/content/Dashboard";
// import Vendors from "../pages/content/Vendors";
// import RFQs from "../pages/content/RFQs";
// import Quotations from "../pages/content/Quotations";
// import Approvals from "../pages/content/Approvals";
// import PurchaseOrders from "../pages/content/PurchaseOrders";
// import Invoices from "../pages/content/Invoices";
// import Reports from "../pages/content/Reports";

// const Approutes = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Login />} />

//         <Route path="/dashboard" element={<Dashboard />} />

//         <Route path="/vendors" element={<Vendors />} />

//         <Route path="/rfqs" element={<RFQs />} />

//         <Route path="/quotations" element={<Quotations />} />

//         <Route path="/approvals" element={<Approvals />} />

//         <Route path="/purchase-orders" element={<PurchaseOrders />} />

//         <Route path="/invoices" element={<Invoices />} />

//         <Route path="/reports" element={<Reports />} />
//       </Routes>
//     </>
//   );
// };

// export default Approutes;
import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/authpages/Login";
import Register from "../pages/authpages/Register";
import Layout from "../layout/Layout";

import Dashboard from "../pages/content/Dashboard";
import Vendors from "../pages/content/Vendors";
import RFQs from "../pages/content/RFQs";
import Quotations from "../pages/content/Quotations";
import Approvals from "../pages/content/Approvals";
import PurchaseOrders from "../pages/content/PurchaseOrders";
import Invoices from "../pages/content/Invoices";
import Reports from "../pages/content/Reports";

const Approutes = () => {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Sidebar Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/rfqs" element={<RFQs />} />
        <Route path="/quotations" element={<Quotations />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/purchase-orders" element={<PurchaseOrders />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};

export default Approutes;