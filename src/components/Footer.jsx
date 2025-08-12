import React from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

import Logo from "../img/logo.png";

const Footer = () => (
  <footer className="w-full bg-bg-footer px-10 py-20 text-white flex flex-col gap-11">
    <div className="lg:flex items-start justify-between gap-5">
      <div className="basis-1/4 contact flex flex-col items-center">
        <h1 className="text-4xl font-titleFont font-semibold py-5">
          Contact Us
        </h1>
        <p className="pb-5 text-gray-400">01 Pham Van Dong, Ho Chi Minh City</p>
        <p className="text-gray-400 pb-2">
          Phone:{" "}
          <a
            href="tel:0935302341"
            className="hover:text-my-yellow duration-500"
          >
            0935302341
          </a>
        </p>
        <p className="text-gray-400">
          Email:{" "}
          <a
            href="mailto:avantgarden@gmail.com"
            className="hover:text-my-yellow duration-500"
          >
            avantgarden@gmail.com
          </a>
        </p>
      </div>

      <div className="basis-1/2 restaurant-info flex flex-col items-center">
        <img src={Logo} alt="logo" className="py-5" />
        <p className="pb-6 capitalize text-center">
          &quot;The best way to find yourself is to lose yourself in the service
          of others.&quot;
        </p>

        <div className="social text-3xl flex justify-evenly gap-5">
          <a
            href=""
            className="hover:text-my-yellow hover:scale-125 duration-500"
          >
            <FiFacebook />
          </a>
          <a
            href=""
            className="hover:text-my-yellow hover:scale-125 duration-500"
          >
            <FiTwitter />
          </a>
          <a
            href=""
            className="hover:text-my-yellow hover:scale-125 duration-500"
          >
            <FiInstagram />
          </a>
        </div>
      </div>

      <div className="basis-1/4 open-hour flex flex-col items-center">
        <h1 className="text-4xl font-titleFont font-semibold py-5">
          Opening Hours
        </h1>
        <p className="text-gray-400 pb-2">Monday - Friday:</p>
        <p className="text-my-yellow pb-5">09:00 - 22:00</p>
        <p className="text-gray-400 pb-2">Saturday - Sunday:</p>
        <p className="text-my-yellow">07:00 - 23:00</p>
      </div>
    </div>

    <div className="copyright mx-auto">
      <p className="">2022@AvantGarden. All Rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
