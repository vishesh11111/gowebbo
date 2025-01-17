import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  // If authenticated, render the component; otherwise, navigate to login
  return token ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
