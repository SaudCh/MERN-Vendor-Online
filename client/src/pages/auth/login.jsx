import React, { useContext, useEffect, useState } from "react";
import "./auth.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import LoadingSpinner from "../../components/spinner";
import { WishlistContext } from "../../context/wishlistContext";
import { AiOutlineGoogle } from "react-icons/ai";

export default function LoginP() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { Login } = useContext(AuthContext);
  const { state } = useLocation();
  const { getWishList } = useContext(WishlistContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    await axios
      .post("user/login", data)
      .then((res) => {
        Login(res.data, res.data.token);
        getWishList()

        if (state?.from) {
          navigate(state?.from, { state });
          return;
        }

        navigate("/");

      })
      .catch((err) => {
        let error = {};
        error.api = err?.response?.data?.message || err.message;
        setErrors(error);
      });

    setIsLoading(false);
  };

  return (
    <div className=" auth-container">
      {isLoading && <LoadingSpinner asOverlay />}
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="grid  grid-cols-1 md:grid-cols-3 justify-center items-center flex-wrap h-full">
            <div />
            <div className="mb-12 md:mb-0 bg-white p-5 rounded shadow">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">
                    MS Optics
                  </p>
                </div>
                {errors.api && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3"
                    role="alert"
                  >
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">{errors.api}</span>
                  </div>
                )}
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button className="inline-block px-7 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Login
                  </button>
                  <Link
                    to="/register"
                    className="inline-block px-7 py-2 ml-2 border border-solid border-blue-600 text-blue-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out hover:cursor-pointer"
                  >
                    Register
                  </Link>
                </div>

              </form>
            </div>
            <div />
          </div>
        </div>
      </section>
    </div>
  );
}
