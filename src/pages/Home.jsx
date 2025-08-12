import React from "react";
import { Link } from "react-router-dom";

import { Carousel } from "../components";

const Home = () => {
  return (
    <div className="">
      <Carousel />

      <div class="flex flex-col items-start justify-center gap-2 px-10 h-96 bg-fixed bg-right bg-cover bg-special-event">
        <span class="text-2xl md:text-5xl text-my-yellow font-titleFont font-extrabold capitalize">
          Let us serve you a wonderfull
        </span>
        <span class=" text-5xl md:text-8xl text-my-yellow font-titleFont font-extrabold capitalize">
          christmast dining!
        </span>
        <span class="text-lg md:text-xl text-white capitalize">
          Special discount on 24/12
        </span>
      </div>

      <div className="flex flex-col items-center bg-theme-dark my-10">
        <Link
          to="/menu"
          className="px-5 md:px-10 font-titleFont text-8xl text-my-yellow py-10"
        >
          Our Menu
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
          <Link
            to="/menu"
            id="menu-child1"
            className="flex flex-col items-center pt-10 px-10 h-[28rem] border border-white bg-main bg-cover bg-center hover:scale-125 duration-500"
          >
            <p className="text-white font-titleFont text-5xl">Main Dishes</p>
          </Link>
          <Link
            to="/menu"
            id="menu-child2"
            className="flex flex-col items-center  pt-10 px-10 h-[28rem] border border-white bg-starter bg-cover bg-center hover:scale-125 duration-500"
          >
            <p className="font-titleFont text-5xl">Starters</p>
          </Link>
          <Link
            to="/menu"
            className="flex flex-col items-center  pt-10 px-10 h-[28rem] border border-white bg-dessert bg-cover bg-center hover:scale-125 duration-500"
          >
            <p className="text-white font-titleFont text-5xl">Desserts</p>
          </Link>
          <Link
            to="/menu"
            className="flex flex-col items-center  pt-10 px-10 h-[28rem] border border-white bg-drinks bg-cover bg-center hover:scale-125 duration-500"
          >
            <p className="text-white font-titleFont text-5xl">Drinks</p>
          </Link>
        </div>
      </div>

      <div class="flex flex-col items-start justify-center gap-2 px-10 h-[32rem] bg-fixed bg-right bg-cover bg-landing-img2">
        <span class=" text-6xl md:text-8xl font-titleFont font-extrabold capitalize w-2/3">
          We Look Forward to Serving You!
        </span>
        <Link
          to="/reservation"
          className="mt-5 border-2 border-black py-2 px-5 font-semibold hover:bg-my-yellow hover:duration-200 hover:-translate-y-1 hover:translate-x-1"
        >
          Book A Table Now
        </Link>
      </div>

      <div className="lg:flex justify-evenly items-center my-8">
        <h2 className="text-6xl pb-5 text-center md:text-8xl font-titleFont font-semibold text-my-yellow">
          Our Location
        </h2>
        <div>
          <iframe
            className="map w-full h-[32rem] lg:w-[40rem]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.092565214637!2d106.8031880143276!3d10.880563960239225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d958707f8685%3A0xd577177b5198597f!2sHo%20Chi%20Minh%20City%20University%20of%20Technology%20-%20Vietnam%20National%20University%20Ho%20Chi%20Minh%20City%20(Campus%202)!5e0!3m2!1sen!2s!4v1670680016999!5m2!1sen!2s"
            style={{ border: "2px solid blue" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Home;
