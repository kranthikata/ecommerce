import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Use Link instead of <a>
import { toast } from "react-toastify"; // For toast notifications
import api from "../api";
import forgotPassword from "../assets/forgotPassword.png"; // Reuse the same shopping image

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/forgot-password", { email });
      toast.success(response.data.message); // Toast for successful request
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(
        error.response
          ? error.response.data.message
          : "An unexpected error occurred. Please try again."
      );
      toast.error(error.response?.data.message || "Failed to send reset link."); // Toast for error
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side Section */}
      <div className="w-1/2 bg-emerald-400 flex flex-col justify-center items-center text-white p-6 rounded-tr-2xl rounded-br-2xl">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          Forgot Your Password?
        </h1>
        <p className="text-lg mb-4 text-center">
          Don't worry! Enter your email, and we'll send you a link to reset your
          password.
        </p>
        <img src={forgotPassword} alt="Shopping" className="rounded-lg w-2/3" />
      </div>

      {/* Right Side Section - Forgot Password Form */}
      <div className="w-1/2 flex justify-center items-center p-6">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className={`w-full py-2 mt-4 bg-blue-600 text-white rounded-md ${
                loading ? "opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="mt-4 text-center">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
