import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext/userContext";

export const PrivateRoute = ({ path, element }) => {
  const { user } = useUser();
  console.log({ user, inc: "Abcb" });
  return user ? (
    <Route element={element} path={path} />
  ) : (
    <Navigate state={{ from: { pathName: path } }} replace to="/signin" />
  );
};
