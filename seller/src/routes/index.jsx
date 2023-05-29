import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import AddEvent from "../pages/info/add";
import Orders from "../pages/orders";
import OrderDetails from "../pages/orders/details";
import Products from "../pages/product";
import AddProduct from "../pages/product/add";
import EditProduct from "../pages/product/edit";

import AuthRoute from "./authRoute";
import Loading from "./loading";
import Register from "../pages/auth/register";
import ChatBox from "../pages/chat";

const ProtectedRoute = lazy(() => import("./protectedRoute"));
const Layout = lazy(() => import("./layout"));
const Login = lazy(() => import("../pages/auth/login"));
const Home = lazy(() => import("../pages/home"));

export default function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Routes>
          <Route path="/login" element={<AuthRoute component={<Login />} />} />
          <Route path="/register" element={<AuthRoute component={<Register />} />} />

          <Route path="/" element={<Layout />}>
            <Route path="/" element={<ProtectedRoute component={<Home />} />} />

            <Route
              path="/chats"
              element={<ProtectedRoute component={<ChatBox />} />}
            />

            <Route
              path="/settings"
              element={<ProtectedRoute component={<AddEvent />} />}
            />

            {/* Products */}
            <Route
              path="/products"
              element={<ProtectedRoute component={<Products />} />}
            />
            <Route
              path="/product/add"
              element={<ProtectedRoute component={<AddProduct />} />}
            />
            <Route
              path="/product/:id"
              element={<ProtectedRoute component={<EditProduct />} />}
            />

            {/* Orders */}
            <Route
              path="/orders"
              element={<ProtectedRoute component={<Orders />} />}
            />
            <Route
              path="/order/:id"
              element={<ProtectedRoute component={<OrderDetails />} />}
            />

          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}
