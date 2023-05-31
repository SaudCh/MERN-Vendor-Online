import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/authContext";

import Cart from "../pages/cart";
import Product from "../pages/product";
import WishList from "../pages/wishlist";
import AuthRoute from "./authRoute";

import Loading from "./loading";
import ProtectedRoute from "./protectedRoute";
import ChatBox from "../pages/chat";
import Checkout from "../pages/checkout";

const Layout = lazy(() => import("./layout"));

const Login = lazy(() => import("../pages/auth/login"));
const Register = lazy(() => import("../pages/auth/register"));

const Home = lazy(() => import("../pages/home"));

export default function AppRouter() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route
              path="/checkout"
              element={<Checkout />}
            />
            <Route
              path="/chat"
              element={<ChatBox />}
            />




            <Route
              path="/product/:id"
              element={<Product />}
            />

            <Route
              path="/login"
              element={<AuthRoute component={<Login />} />}
            />
            <Route
              path="register"
              element={<AuthRoute component={<Register />} />}
            />
            <Route
              path="/wishlist"
              element={<ProtectedRoute component={<WishList />} />}
            />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}
