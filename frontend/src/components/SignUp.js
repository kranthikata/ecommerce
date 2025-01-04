import React, { useState } from "react";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom"; // Use Link instead of <a>
import { toast } from "react-toastify";
import api from "../api";
import shoppingImage from "../assets/shopping1.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match."); // Toast for password mismatch
      setLoading(false);
      return;
    }
    try {
      const response = await api.post("/user/signup", { email, password });
      toast.success(response.data.message); // Toast for successful signup
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(
        error.response
          ? error.response.data.message
          : "An unexpected error occurred. Please try again."
      );
      toast.error(error.response?.data.message || "Signup failed."); // Toast for error
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side Section */}
      <div className="w-1/2 bg-emerald-400 flex flex-col justify-center items-center text-white p-6 rounded-tr-2xl rounded-br-2xl">
        <h1 className="text-5xl font-extrabold mb-4 text-center">
          Welcome to Your New Shopping Journey!
        </h1>
        <p className="text-lg mb-4 text-center">
          Sign up and start shopping the best deals today. Enjoy exclusive
          offers and an amazing experience.
        </p>
        <img src={shoppingImage} alt="Shopping" className="rounded-lg" />
      </div>

      {/* Right Side Section - Sign Up Form */}
      <div className="w-1/2 flex justify-center items-center p-6">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSignUp}>
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

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEye /> : <RiEyeCloseFill />}
              </span>
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 mt-1 border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? <FaEye /> : <RiEyeCloseFill />}
              </span>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className={`w-full py-2 mt-4 bg-blue-600 text-white rounded-md ${
                loading ? "opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="mt-4 text-center">
              Already have an account?{" "}
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

export default SignUp;
