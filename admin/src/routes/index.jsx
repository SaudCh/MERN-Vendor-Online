import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AddEvent from "../pages/info/add";
import Orders from "../pages/orders";
import OrderDetails from "../pages/orders/details";
import Products from "../pages/product";
import AddProduct from "../pages/product/add";
import EditProduct from "../pages/product/edit";
import Users from "../pages/users";

// import { AuthContext } from "../contexts/authContext";
import AuthRoute from "./authRoute";
import Loading from "./loading";
import Categories from "../pages/category";
import AddCategory from "../pages/category/add";
import EditCategory from "../pages/category/edit";
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

          <Route path="/" element={<Layout />}>
            {/* Home */}
            <Route path="/" element={<ProtectedRoute component={<Home />} />} />

            {/* Users */}
            <Route
              path="/chats"
              element={<ProtectedRoute component={<ChatBox />} />}
            />
            <Route
              path="/users"
              element={<ProtectedRoute component={<Users />} />}
            />
            <Route
              path="/categories"
              element={<ProtectedRoute component={<Categories />} />}
            />
            <Route
              path="/category/add"
              element={<ProtectedRoute component={<AddCategory />} />}
            />
            <Route
              path="/category/:id"
              element={<ProtectedRoute component={<EditCategory />} />}
            />
            {/* <Route
              path="/user/add"
              element={<ProtectedRoute component={<AddUsers />} />}
            />
            <Route
              path="/user/add"
              element={<ProtectedRoute component={<AddUsers />} />}
            /> */}

            {/* Events */}

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
