import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./contexts/authContext";
import { useAuth } from "./hooks/useAuth";
import axios from "axios";
import Routes from "./routes";
import { LoadingContext } from "./contexts/loadingContext";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  axios.defaults.headers.post["Content-Type"] = "application/json";

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

  const { user, token, Login, Logout } = useAuth();
  return (
    <LoadingContext.Provider
      value={{
        loading: loading,
        setLoading: setLoading,
      }}
    >
      <AuthContext.Provider
        value={{
          isLoggedIn: !!user,
          user: user,
          Login: Login,
          Logout: Logout,
          token: token,
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
    </LoadingContext.Provider>
  );
}

export default App;
