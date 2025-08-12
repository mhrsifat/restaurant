import React from "react";

import Logo from "../img/logo.png";
import Chef from "../img/about_chef.jpg";

const About = () => {
  return (
    <div className="about">
      <div class="flex flex-col items-center gap-5 justify-center h-screen bg-fixed bg-center bg-cover bg-about-page">
        <h2 class="text-white text-6xl px-5 md:text-8xl font-titleFont font-extrabold capitalize">
          Welcome to
        </h2>
        <img src={Logo} alt="logo" />
      </div>

      <div className="py-14 text-center">
        <span class="font-titleFont text-my-yellow capitalize font-semibold text-4xl tracking-wider">
          Serving Customers For Over A Decade
        </span>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-16 pb-24 text-white">
          <div className="flex flex-col gap-2 font-titleFont">
            <span className="text-9xl text-my-yellow">10+</span>
            <span className="text-2xl">Experienced chefs</span>
          </div>
          <div className="flex flex-col gap-2 font-titleFont">
            <span className="text-9xl text-my-yellow">Winner</span>
            <span className="text-2xl">Restaurant Of Year 2021</span>
          </div>
          <div className="flex flex-col gap-2 font-titleFont">
            <span className="text-9xl text-my-yellow">50+</span>
            <span className="text-2xl">Courses And Drinks</span>
          </div>
        </div>

        <div className="px-5 md:px-10 lg:flex items-start justify-between">
          <img src={Chef} alt="chef" className="pb-10 w-full lg:w-1/2" />
          <div className="pl-10">
            <p className="py-2 text-my-yellow font-titleFont text-2xl">
              Executive Chef
            </p>
            <p className="uppercase text-my-yellow pb-5 text-4xl">
              Peter Cuong Franklin
            </p>
            <p className="text-white leading-7 text-left">
              Peter Cuong Franklin is a Vietnamese-American chef who studied at
              Le Cordon Bleu and trained at world-famous restaurants including
              Caprice in Hong Kong, Alinea in Chicago and Nahm in Bangkok. A
              pioneer of modern Vietnamese and Asian cuisine, he is a leading
              light and one of the most recognizable faces on the country’s
              dynamic gastronomic scene. His true inspiration is his mother, who
              runs a small noodle shop in Dalat in central Vietnam and is famed
              for her prawn & pork turmeric noodle soup. At Anan Saigon, he
              combines his deep knowledge of Southeast Asian street-food flavors
              with contemporary international techniques. He serves on the
              advisory board of Streets International, a charity that trains
              disadvantaged youths for a career and future in F&B. Chef Peter
              also helms Nhau Nhau cocktail bar and Pot Au Pho noodle bar, with
              all his restaurants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
