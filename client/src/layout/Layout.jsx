import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Vendors", path: "/vendors" },
    { name: "RFQs", path: "/rfqs" },
    { name: "Quotations", path: "/quotations" },
    { name: "Approvals", path: "/approvals" },
    { name: "Purchase Orders", path: "/purchase-orders" },
    { name: "Invoices", path: "/invoices" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-slate-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-8">
          VendorBridge
        </h1>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-600 transition mt-4"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;