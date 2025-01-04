import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const userId = localStorage.getItem("userId"); // Check if the user is logged in

  if (userId) {
    return <Navigate to="/" />; // Redirect to products page if user is already logged in
  }

  return children; // Render the children (public route) if not logged in
};

export default PublicRoute;
