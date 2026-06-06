import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);

      toast.success(res.message || "Registration Successful");
      console.log(res);
      
      navigate("/");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  const onError = () => {
    toast.error("Please fill all required fields");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Section */}
        <div className="p-8 md:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              VendorBridge
            </h1>

            <p className="text-slate-500 mt-2">
              Procurement & Vendor Management ERP
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-6">
            Create Account
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", {
                  required: true,
                })}
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.name
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: true,
                })}
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.email
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.password
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              />
            </div>

            {/* Role */}
            <div>
              <select
                {...register("role", {
                  required: true,
                })}
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 ${
                  errors.role
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
              >
                <option value="">
                  Select Role
                </option>

                <option value="procurement">
                  Procurement Officer
                </option>

                <option value="vendor">
                  Vendor
                </option>

                <option value="manager">
                  Manager
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-medium"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex bg-slate-900 text-white items-center justify-center p-10">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              VendorBridge
            </h2>

            <p className="text-slate-300 leading-relaxed">
              Manage Vendors, RFQs, Quotations,
              Approvals, Purchase Orders and
              Invoices from one centralized ERP
              platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;