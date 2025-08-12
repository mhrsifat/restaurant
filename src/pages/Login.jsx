import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../actions/userActions";

import login_img from "../img/login.jpg";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [alert, setAlert] = useState();

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userInfo = { email, password };

    login(userInfo).then((res) => {
      if (res.status === 201) setAlert(res.data);
      else {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        localStorage.setItem("cart", JSON.stringify([]));
        navigate("/");
        // window.location.reload();
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full pt-20">
      <div className="hidden md:block">
        <img
          className="h-screen w-full "
          src={login_img}
          alt="login-avant-garden"
        />
      </div>

      <div className="bg-black flex flex-col justify-center bg-bg-footer">
        <form className="max-w-[400px] w-full mx-auto bg-zinc-900 bg-opacity-50 p-8 px-8">
          <h2 className="text-5xl font-bold text-center text-my-yellow font-titleFont py-5">
            Log In
          </h2>

          {/* Validate alert */}
          <p className="text-red-600 text-sm text-center pt-2">{alert}</p>

          <div className="flex flex-col text-gray-400 py-2 text-sm">
            <label>Email</label>
            <input
              className="bg-neutral-800 bg-opacity-60 my-2 p-2 px-3 border-0 focus:border-my-yellow focus:ring-my-yellow"
              type="text"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label>Password</label>
            <input
              className="bg-neutral-800 bg-opacity-60 my-2 p-2 px-3 border-0 focus:border-my-yellow focus:ring-my-yellow"
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            className="w-full my-5 py-2 border border-my-yellow text-white font-serif hover:bg-my-yellow hover:duration-200 hover:-translate-y-1 hover:translate-x-1 hover:text-black"
            onClick={handleLogin}
          >
            Let's explore Avant Garden!
          </button>
          <p className="text-gray-400 text-xs text-center">
            Don't you have an account?{" "}
            <Link to="/register" className="text-my-yellow hover:underline">
              {" "}
              Register{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
