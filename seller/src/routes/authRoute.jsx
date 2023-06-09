import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

export default function AuthRoute({ component }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return component;
  }

  return <Navigate to="/" />;
}
