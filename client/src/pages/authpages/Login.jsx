import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
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
            Welcome Back
          </h2>

          <form
            onSubmit={handleSubmit(
              onSubmit,
              onError
            )}
            className="space-y-4"
          >
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

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-medium"
            >
              Register
            </Link>
              <br />
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              className="text-green-600 font-medium"
            >
              Reset Password
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

export default Login;