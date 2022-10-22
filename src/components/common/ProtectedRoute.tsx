import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { ROUTE_PATH } from "../../constants";
import { State } from "../../redux/reduxStore";
import { getIsAuth } from "../../redux/selectors.ts/authSelectors";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useSelector((state: State) => getIsAuth(state));

  return (!isAuth) ? <Navigate to={ROUTE_PATH.LOGIN} /> : children;
};
