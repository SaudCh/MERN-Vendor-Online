import React, { useContext, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import LoadingSpinner from "../components/spinner";
import { LoadingContext } from "../context/loadingContext";
import Header from "../components/header";
import Footer from "../components/footer";

function Layout() {
  const { isLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const { Logout } = useContext(AuthContext);

  const logout = () => {
    Logout();
    navigate("/login");
  };

  return (
    <div>
      {isLoading && <LoadingSpinner asOverlay />}
      <Header />

      <div className="min-h-[80vh] bg-slate-50">
        <Outlet />
      </div>

      <Footer />

    </div>
  );
}

export default Layout;
