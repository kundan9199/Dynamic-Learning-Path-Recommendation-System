import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, Sparkles, Check } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { authAPI } from "../utils/api";
import { authUtils } from "../utils/auth";

const features = [
  "Personalized learning paths",
  "AI-powered recommendations",
  "Track your progress",
  "Earn certificates",
];

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Call the backend API to register the user
      const data = await authAPI.register(formData);
      
      // Save token and user data to localStorage
      authUtils.saveAuth(data.token, {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        avatar: data.avatar,
      });

      // Navigate to dashboard
      navigate("/");
    } catch (error) {
      setErrors({ general: error.message || "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Left - Hero */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-linear-to-br from-zinc-900 to-zinc-950 border-r border-zinc-800">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Start Learning Today
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Unlock your potential with personalized learning
          </h2>
          <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
            Create your free account and get instant access to hundreds of
            courses designed to help you succeed.
          </p>

          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <span className="text-zinc-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-teal-400 to-teal-600 rounded-2xl mb-6 shadow-xl shadow-teal-500/20">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Create your account
            </h1>
            <p className="text-zinc-400">
              Start your personalized learning journey
            </p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-800 p-8">
            {errors.general && (
              <div className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {errors.general}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={errors.name}
                disabled={loading}
              />

              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email}
                disabled={loading}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    disabled={loading}
                    className={`w-full px-4 py-3 pr-11 text-white bg-zinc-900 border rounded-xl transition-all duration-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.password ? "border-red-500" : "border-zinc-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400">{errors.password}</p>
                )}
                <p className="text-xs text-zinc-500">
                  Must be at least 8 characters
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 rounded border-zinc-600 bg-zinc-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-zinc-900"
                />
                <span className="text-sm text-zinc-400">
                  I agree to the{" "}
                  <a href="#" className="text-teal-400 hover:text-teal-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-teal-400 hover:text-teal-300">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </div>

          <p className="text-center mt-8 text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
