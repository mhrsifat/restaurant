import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../actions/userActions";

import login_img from "../img/login.jpg";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [fullname, setFullname] = useState();
  const [phone, setPhone] = useState();

  const [alert, setAlert] = useState();

  const navigate = useNavigate();

  const userInfo = { email, password, confirmPassword, fullname, phone };

  const handleRegister = (e) => {
    e.preventDefault();
    register(userInfo).then((res) => {
      setAlert(res.data.trim());
      if (res.status === 201)
        setTimeout(() => {
          navigate("/login");
        }, 1500);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full pt-20">
      <div className="hidden md:block">
        <img className="h-screen w-full" src={login_img} alt="" />
      </div>

      <div className="bg-black flex flex-col justify-center bg-bg-footer">
        <form className="max-w-[400px] w-full mx-auto bg-zinc-900 bg-opacity-50 p-8 px-8">
          <h2 className="text-5xl font-bold text-center text-my-yellow font-titleFont py-2">
            Register
          </h2>

          {/* Validate alert */}
          <p
            className={`${
              alert === "You have successfully registered, you can log in now!"
                ? "text-green-600"
                : "text-red-600"
            }  text-sm text-center pt-2`}
          >
            {alert}
          </p>

          <div className="flex flex-col text-gray-400 py-2 text-sm">
            <label>Your name</label>
            <input
              required
              className="bg-neutral-800 bg-opacity-60  my-2 p-2 px-3 border-0 focus:border-my-yellow focus:ring-my-yellow"
              type="text"
              name="fullname"
              id="fullname"
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
            <label>Email</label>
            <input
              required
              className=" bg-neutral-800 bg-opacity-60  my-2 p-2 px-3 border-0 focus:border-my-yellow focus:ring-my-yellow"
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label>Password</label>
            <input
              required
              className=" bg-neutral-800 bg-opacity-60  my-2 p-2 px-3 border-0 focus:border-my-yellow focus:ring-my-yellow"
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label>Confirm Password</label>
            <input
              required
              className=" bg-neutral-800 bg-opacity-60  my-2 p-2 px-3 border-0 focus:border-my-yellow focus:ring-my-yellow"
              type="password"
              name="confirm"
              id="confirm"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <label>Phone</label>
            <input
              required
              className=" bg-neutral-800 bg-opacity-60  my-2 p-2 px-3 border-0 focus:border-my-yellow focus:ring-my-yellow"
              type="tel"
              name="phone"
              id="phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          <button
            className="w-full my-2 py-2 border border-my-yellow text-white font-serif hover:bg-my-yellow hover:duration-200 hover:-translate-y-1 hover:translate-x-1 hover:text-black"
            onClick={handleRegister}
          >
            Let's explore Avant Garden!
          </button>
          <p className="mt-2 text-gray-400 text-xs text-center">
            You had an account?{" "}
            <Link to="/login" className="text-my-yellow hover:underline">
              {" "}
              Login{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
