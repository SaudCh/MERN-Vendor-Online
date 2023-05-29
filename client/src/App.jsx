import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Routes from "./routes";
import { useAuth } from "./hooks/useAuth";
import { LoadingContext } from "./context/loadingContext.js";
import { AuthContext } from "./context/authContext.js";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { CartContext } from "./context/cartContext";
import { useCart } from "./hooks/useCart";
import { WishlistContext } from "./context/wishlistContext";
import { useWislist } from "./hooks/useWishlist";
import 'react-chatbot-kit/build/main.css';
import './app.css'

function App() {
  function getToken() {
    if (localStorage.getItem("token")) {
      const accessToken = localStorage.getItem("token") || "";
      return accessToken;
    }
    return "";
  }

  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL + "api";

  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${getToken()}`;
      return config;
    },
    (error) => {
      return error;
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.data?.message) {
        throw error;
      } else {
        // console.log(error);
      }
    }
  );

  const [loading, setLoading] = React.useState(false);
  const setIsLoading = (value) => {
    setLoading(value);
  };
  const { user, role, token, Login, Logout } = useAuth();
  const { cart, addToCart, removeFromCart, clearCart, getTotal, total, changeQuantity } = useCart()
  const { wishlist, toggleWishlist, clearWishlist, getWishList } = useWislist()

  return (
    <LoadingContext.Provider
      value={{
        isLoading: loading,
        setIsLoading: setIsLoading,
      }}
    >
      <CartContext.Provider
        value={{
          cart: cart,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
          clearCart: clearCart,
          getTotal: getTotal,
          total: total,
          changeQuantity: changeQuantity
        }}
      >
        <WishlistContext.Provider
          value={{
            wishlist: wishlist,
            toggleWishlist: toggleWishlist,
            clearWishlist: clearWishlist,
            getWishList: getWishList
          }}
        >
          < AuthContext.Provider
            value={{
              isLoggedIn: !!user,
              role: role,
              token: token,
              user: user,
              Login: Login,
              Logout: Logout,
            }}
          >

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Router>
              <Routes />
            </Router>
          </AuthContext.Provider>
        </WishlistContext.Provider>
      </CartContext.Provider>
    </LoadingContext.Provider >
  );
}

export default App;
