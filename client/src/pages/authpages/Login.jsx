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
  } = useForm({
    mode: "onTouched"
  });

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
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  const onError = () => {
    toast.error("Please fill all required fields correctly");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 antialiased">
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

        {/* Left Side: Workspace Input Context */}
        <div className="p-6 sm:p-10 md:p-12 lg:col-span-7 flex flex-col justify-center">
          
          {/* Mobile Header Branding View (Hidden on Larger Display Breakpoints) */}
          <div className="mb-8 lg:hidden">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              VendorBridge
            </h1>
            <p className="text-sm font-medium text-slate-400 mt-0.5">
              Procurement & Vendor Management ERP
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
              Welcome Back
            </h2>
            <p className="text-base text-slate-500 mt-1">
              Sign in to manage your procurement workflows and system variables.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-5"
          >
            {/* Email Address Input Field Group */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                {...register("email", { 
                  required: "Email account verification is required" 
                })}
                className={`w-full border rounded-xl px-4 py-3 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10"
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.email && (
                <p className="text-sm font-semibold text-red-600 mt-1.5 flex items-center gap-1">
                  ⚠️ {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input Field Group */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", { 
                  required: "Security key verification code is required" 
                })}
                className={`w-full border rounded-xl px-4 py-3 text-base bg-slate-50/30 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all duration-150 ${
                  errors.password
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/10"
                    : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white"
                }`}
              />
              {errors.password && (
                <p className="text-sm font-semibold text-red-600 mt-1.5 flex items-center gap-1">
                  ⚠️ {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm shadow-emerald-600/10 transition-all duration-150 active:scale-[0.99] mt-2 text-base"
            >
              Authorize System Entry
            </button>
          </form>

          <p className="text-center text-base text-slate-500 mt-8">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="text-emerald-600 font-bold hover:text-emerald-700 underline underline-offset-4 transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>

        {/* Right Side: Illustrative Enterprise Brand Overview Panel */}
        <div className="hidden lg:flex lg:col-span-5 bg-slate-950 text-white p-12 flex-col justify-between relative overflow-hidden">
          {/* Subtle architectural background texture accent */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[16px_16px]"></div>
          
          <div className="relative z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Enterprise Hub v2.0
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight mt-6 text-white">
              VendorBridge
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mt-4">
              Consolidate system vendors, issue strategic requests for quotes (RFQs), map structural pricing variables, audit cross-corporate compliance approvals, and track invoices out of one enterprise pipeline.
            </p>
          </div>

          <div className="relative z-10 border-t border-slate-800 pt-6 mt-12">
            <p className="text-xs font-medium text-slate-500 tracking-wider uppercase">
              Operational Standards
            </p>
            <p className="text-sm text-slate-300 mt-1 font-medium">
              Secured under end-to-end token validation mapping protocols.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;