import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext/userContext";

export const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? (
    children
  ) : (
    // <Navigate state={{ from: { pathName: path } }} replace to="/signin" />
    <Navigate replace to="/signin" />
  );
};
