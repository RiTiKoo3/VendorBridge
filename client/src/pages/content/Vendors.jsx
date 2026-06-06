import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  createVendor,
  getVendors,
  deleteVendor,
} from "../../services/vendorService";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched"
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      setVendors(res.vendors || []);
    } catch (error) {
      toast.error("Failed to load vendor directory matrix");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createVendor(data);
      toast.success("Vendor Partner Registered Successfully");
      reset();
      fetchVendors();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to finalize corporate registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor record? This action cannot be undone.")) return;
    
    try {
      await deleteVendor(id);
      toast.success("Vendor Entity Safely Deleted");
      fetchVendors();
    } catch (error) {
      toast.error("Failed to remove vendor from system registry");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-slate-50/50 min-h-screen space-y-6 sm:space-y-8 antialiased">
      
      {/* Module Title Section */}
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Vendor Management
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Register new commercial partners, organize distribution categories, and oversee active compliance variables.
        </p>
      </div>

      {/* Main Framework Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Hand / Top Section: Form Submission Engine Container */}
        <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
            Add New Vendor Partner
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Field: Corporate Entity Identifier */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name</label>
              <input
                type="text"
                placeholder="e.g. Acme Industries Ltd"
                {...register("companyName", { required: "Company name identity is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.companyName 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.companyName && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.companyName.message}</p>
              )}
            </div>

            {/* Field: Secure System Email Node */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="procurement@acme.com"
                {...register("email", { 
                  required: "Contact email link registration is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email node pattern string" }
                })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.email 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.email && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.email.message}</p>
              )}
            </div>

            {/* Field: Point of Contact Telecom Link */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
              <input
                type="text"
                placeholder="+91 XXXXX XXXXX"
                {...register("phone", { required: "Active communication channel is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.phone 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.phone && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.phone.message}</p>
              )}
            </div>

            {/* Field: Tactical Operations Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Operational Category</label>
              <input
                type="text"
                placeholder="e.g. Raw Materials, Electronics"
                {...register("category", { required: "Material classification category is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.category 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.category && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.category.message}</p>
              )}
            </div>

            {/* Field: Legal Compliance GST Identification */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">GST Number</label>
              <input
                type="text"
                placeholder="22AAAAA0000A1Z5"
                {...register("gstNumber", { required: "Tax validation key is required" })}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.gstNumber 
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10" 
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.gstNumber && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">⚠️ {errors.gstNumber.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm shadow-emerald-600/10 transition-all duration-150 active:scale-[0.99] mt-2 text-sm disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? "Finalizing Registry..." : "Authorize System Partnership"}
            </button>
          </form>
        </div>

        {/* Right Hand / Bottom Section: Main Active Directory Output Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-5">
              Active Vendor Directory
            </h2>

            {/* Viewport Render Layer A: Clean Desktop Table Grid Matrix */}
            <div className="overflow-x-auto -mx-5 sm:-mx-6 hidden md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-6">Company</th>
                    <th className="py-3 px-6">Contact Channels</th>
                    <th className="py-3 px-6">Category</th>
                    <th className="py-3 px-6">Compliance</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {vendors.map((vendor) => (
                    <tr key={vendor._id} className="hover:bg-slate-50/40 transition-colors group">
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {vendor.companyName}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-slate-700 font-semibold text-xs">{vendor.email}</span>
                          <span className="text-slate-400 text-xs font-medium mt-0.5">{vendor.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/40">
                          {vendor.category || "General Unit"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            vendor.status === "inactive"
                              ? "bg-red-50 text-red-700 border border-red-200/60"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          }`}
                        >
                          {vendor.status || "Active Status"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(vendor._id)}
                          className="text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 px-3 py-1.5 rounded-lg transition-colors duration-150"
                        >
                          Purge Registry
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Viewport Render Layer B: Adaptive Mobile Card-Block Switcher (< 768px Viewports) */}
            <div className="md:hidden space-y-4">
              {vendors.map((vendor) => (
                <div key={vendor._id} className="border border-slate-100 rounded-xl p-4 space-y-3 bg-slate-50/30">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{vendor.companyName}</h4>
                      <span className="inline-flex items-center text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md mt-1">
                        {vendor.category || "General Unit"}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        vendor.status === "inactive"
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      }`}
                    >
                      {vendor.status || "Active"}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-slate-500 border-t border-slate-100 pt-2 font-medium">
                    <div className="flex justify-between"><span className="text-slate-400">Email:</span> <span>{vendor.email}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Phone:</span> <span>{vendor.phone}</span></div>
                    {vendor.gstNumber && <div className="flex justify-between"><span className="text-slate-400">GSTIN:</span> <span className="font-mono tracking-tight">{vendor.gstNumber}</span></div>}
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleDelete(vendor._id)}
                      className="w-full text-center text-xs font-bold text-red-600 bg-red-50/50 hover:bg-red-50 border border-red-100 py-2 rounded-xl transition duration-150"
                    >
                      Purge Registry Record
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {vendors.length === 0 && (
              <div className="text-center py-12 text-slate-400 font-medium text-sm border-2 border-dashed border-slate-100 rounded-xl">
                📭 Zero partner nodes verified inside structural databases.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Vendors;