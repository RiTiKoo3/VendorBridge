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
    { name: "Comparison", path: "/comparison" },
    { name: "Approvals", path: "/approvals" },
    { name: "Purchase Orders", path: "/purchase-orders" },
    { name: "Invoices", path: "/invoices" },
    { name: "Reports", path: "/reports" }
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 antialiased">
      {/* Sidebar navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div className="flex flex-col flex-1 overflow-y-auto p-5">
          {/* Header branding block */}
          <div className="px-3 pb-6 mb-4 border-b border-slate-800/60">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Vendor<span className="text-emerald-400">Bridge</span>
            </h1>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mt-1">
              Enterprise ERP
            </span>
          </div>

          {/* Navigation link frame */}
          <nav className="space-y-1.5 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-base rounded-xl transition-all duration-150 group relative ${
                    isActive
                      ? "bg-slate-800 text-emerald-400 font-semibold shadow-sm"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active side indicator element */}
                    {isActive && (
                      <span className="absolute left-0 w-1 h-5 bg-emerald-400 rounded-r-md" />
                    )}
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Action utility drawer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-150 group"
          >
            <span>Logout Account</span>
            <svg 
              className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Primary context panel */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative focus:outline-none">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;