import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Use Link instead of <a>
import { toast } from "react-toastify"; // For toast notifications
import api from "../api";
import shoppingImage from "../assets/shopping1.png"; // Reuse the same shopping image

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetToken = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (!resetToken) {
      setError("No reset token provided.");
    }
  }, [resetToken]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/reset-password", {
        resetToken,
        newPassword,
      });
      toast.success(response.data.message); // Success toast for password reset
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(
        error.response
          ? error.response.data.message
          : "An unexpected error occurred. Please try again."
      );
      toast.error(error.response?.data.message || "Password reset failed."); // Error toast for failure
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side Section */}
      <div className="w-1/2 bg-emerald-400 flex flex-col justify-center items-center text-white p-6 rounded-tr-2xl rounded-br-2xl">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          Reset Your Password
        </h1>
        <p className="text-lg mb-4 text-center">
          Enter your new password and confirm it to reset. You can now access
          your account with the new credentials.
        </p>
        <img src={shoppingImage} alt="Shopping" className="rounded-lg" />
      </div>

      {/* Right Side Section - Reset Password Form */}
      <div className="w-1/2 flex justify-center items-center p-6">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Reset Password
          </h2>
          <form onSubmit={handleResetPassword}>
            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full px-4 py-2 mt-1 border rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your new password"
                className="w-full px-4 py-2 mt-1 border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 mt-4 bg-blue-600 text-white rounded-md ${
                loading ? "opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <div className="mt-4 text-center">
              Remembered your password?{" "}
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

export default ResetPassword;
