import React, { useContext, useState } from "react";
import "./auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../components/InputFields";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import LoadingSpinner from "../../components/spinner";

export default function LoginP() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const { Login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = Validator(data);

    setErrors(error);
    if (Object.keys(error).length > 0) return;

    setIsLoading(true);

    await axios
      .post("user/signup", data)
      .then((res) => {
        Login(res.data, res.data.token);
        navigate("/account");
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
                  <TextInput
                    type="text"
                    className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="First Name"
                    value={data.firstname}
                    onChange={(e) =>
                      setData({ ...data, firstname: e.target.value })
                    }
                    error={errors.firstname}
                  />

                  <TextInput
                    type="text"
                    className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Last Name"
                    value={data.lastname}
                    onChange={(e) =>
                      setData({ ...data, lastname: e.target.value })
                    }
                    error={errors.lastname}
                  />

                  <TextInput
                    type="email"
                    className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    error={errors.email}
                  />

                  <TextInput
                    type="password"
                    className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    error={errors.password}
                  />

                  <TextInput
                    type="password"
                    className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Confirm Password"
                    value={data.cpassword}
                    onChange={(e) =>
                      setData({ ...data, cpassword: e.target.value })
                    }
                    error={errors.cpassword}
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button className="inline-block px-7 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Register
                  </button>
                  <Link
                    to="/login"
                    className="inline-block px-7 py-2 ml-2 border border-solid border-blue-600 text-blue-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out hover:cursor-pointer"
                  >
                    Login
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
const Validator = (data) => {
  const error = {};

  if (!data.firstname) {
    error.firstname = "First Name is required";
  }

  if (!data.email) {
    error.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
    error.email = "Email is invalid";
  }

  if (!data.password) {
    error.password = "Password is required";
  }

  if (!data.cpassword) {
    error.cpassword = "Confirm Password is required";
  } else if (data.password !== data.cpassword) {
    error.cpassword = "Password does not match";
  }

  return error;
};
