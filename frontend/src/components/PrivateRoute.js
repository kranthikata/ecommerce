import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId"); // Check if the user is logged in

  if (!userId) {
    return <Navigate to="/login" />; // Redirect to login if user is not logged in
  }

  return children; // Render the children (protected route) if logged in
};

export default PrivateRoute;
