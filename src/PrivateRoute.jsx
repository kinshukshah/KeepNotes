import React from "react";
import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ path, element }) => {
  //   const { user } = useUser();
  console.log("Inc")
  console.log({ path });
  let user = false;
  return user ? (
    <Route element={element} path={path} />
  ) : (
    <Navigate state={{ from: { pathName: path } }} replace to="/signin" />
  );
};
