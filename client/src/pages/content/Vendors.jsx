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

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      setVendors(res.vendors);
    } catch (error) {
      toast.error("Failed to load vendors");
    }
  };

  const onSubmit = async (data) => {
    try {
      await createVendor(data);
      toast.success("Vendor Created");
      reset();
      fetchVendors();
    } catch (error) {
      toast.error("Failed to create vendor");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVendor(id);
      toast.success("Vendor Deleted");
      fetchVendors();
    } catch (error) {
      toast.error("Failed to delete vendor");
    }
  };

  return (
    <div className="p-6 max-w-400 mx-auto bg-slate-50/50 min-h-screen space-y-8 antialiased">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Vendor Management
        </h1>
        <p className="text-base text-slate-500 mt-1">
          Register new partners, organize distribution categories, and oversee compliance logs.
        </p>
      </div>

      {/* Main Grid View */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Left/Top: Create Vendor Card Form */}
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            Add New Vendor
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name</label>
              <input
                type="text"
                placeholder="e.g. Acme Corp Industries"
                {...register("companyName")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="vendor@company.com"
                {...register("email")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
              <input
                type="text"
                placeholder="+91 XXXXX XXXXX"
                {...register("phone")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
              <input
                type="text"
                placeholder="e.g. Raw Materials, Logistics"
                {...register("category")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">GST Number</label>
              <input
                type="text"
                placeholder="22AAAAA0000A1Z5"
                {...register("gstNumber")}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-150"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm shadow-emerald-600/10 transition-all duration-150 active:scale-[0.99] mt-2"
            >
              Register Partner
            </button>
          </form>
        </div>

        {/* Right/Bottom: Main Registry Vendor List Table Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            Active Vendor Directory
          </h2>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Company</th>
                  <th className="py-3 px-6">Contact Info</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-base text-slate-700">
                {vendors.map((vendor) => (
                  <tr key={vendor._id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {vendor.companyName}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-slate-800 text-sm font-medium">{vendor.email}</span>
                        <span className="text-slate-400 text-xs mt-0.5">{vendor.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center text-sm font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                        {vendor.category || "General"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                          vendor.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            : "bg-red-50 text-red-700 border border-red-200/60"
                        }`}
                      >
                        {vendor.status || "Active"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(vendor._id)}
                        className="text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 px-3 py-1.5 rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {vendors.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-slate-400 font-medium bg-slate-50/20">
                      No registered vendors found in system database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendors;