import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../services/authService";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close the slide-out drawer layout automatically when a link path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
      
      {/* 1. MOBILE HEADER BACKBONE PANEL (Visible on smaller breakpoints < xl) */}
      <header className="xl:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-black text-white tracking-tight">
            Vendor<span className="text-emerald-400">Bridge</span>
          </h1>
        </div>
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
          aria-label="Toggle Navigation Control Drawer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* 2. BACKDROP OVERLAY ELEMENT (Closes navigation when background workspace frame is selected) */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="xl:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 transition-opacity duration-200"
        />
      )}

      {/* 3. STRUCTURAL SIDEBAR WRAPPER (Persistent on xl, sliding drawer on smaller breaks) */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 z-50 transform 
        xl:relative xl:transform-none transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
      `}>
        <div className="flex flex-col flex-1 overflow-y-auto p-5 pt-8 xl:pt-5">
          {/* Header branding block */}
          <div className="px-3 pb-6 mb-4 border-b border-slate-800/60 hidden xl:block">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Vendor<span className="text-emerald-400">Bridge</span>
            </h1>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mt-1">
              Procurement ERP • v2.0
            </span>
          </div>

          <div className="px-3 pb-4 mb-4 border-b border-slate-800/60 xl:hidden flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Navigation Menu
            </span>
          </div>

          {/* Core Navigation List Navigation Links */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-150 group relative ${
                    isActive
                      ? "bg-slate-800 text-emerald-400"
                      : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active internal target safety boundary bar */}
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

        {/* System Sign-Out Control Area */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-150 group"
          >
            <span>Disconnect Session</span>
            <svg 
              className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </aside>

      {/* 4. MAIN WORKING CONTEXT CANVAS VIEWPORT */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative focus:outline-none pt-16 xl:pt-0">
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
};

export default Layout;