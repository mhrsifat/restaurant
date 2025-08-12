import React, { useState, useEffect } from "react";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { IoRestaurantOutline } from "react-icons/io5";

import Img4 from "../img/img4.jpg";
import Img5 from "../img/img5.jpg";
import Img1 from "../img/img1.jpg";
import Img2 from "../img/img2.jpg";

const handleDragStart = (e) => e.preventDefault();

const renderNextButton = ({ isDisabled }) => {
  return (
    <div className="hidden md:block cursor-pointer hover:opacity-75">
      <IoMdArrowDropright
        style={{
          position: "absolute",
          right: 20,
          top: "325px",
          zIndex: 40,
          color: "#dcca87",
          backgroundColor: "0c0c0c",
          borderRadius: "50%",
          padding: 10,
          width: "50px",
          height: "50px",
          fontSize: 30,
        }}
      />
    </div>
  );
};

const renderPrevButton = ({ isDisabled }) => {
  return (
    <div className="hidden md:block cursor-pointer hover:opacity-75">
      <IoMdArrowDropleft
        style={{
          position: "absolute",
          left: 20,
          top: "325px",
          zIndex: 40,
          color: "#dcca87",
          backgroundColor: "0c0c0c",
          borderRadius: "50%",
          padding: 10,
          width: "50px",
          height: "50px",
          fontSize: 30,
        }}
      />
    </div>
  );
};

const LazyLoader = (props) => {
  let timerId;
  const { src = "", delay = 0, onLoad } = props;
  const [isMounted, setMounted] = useState(false);
  const [isLoading, setLoading] = useState(true);

  function loadImage() {
    const image = new Image();

    image.src = src;
    image.onload = () => {
      setLoading(false);
      onLoad();
    };
    image.onerror = () => {
      setLoading(false);
    };
  }

  useEffect(() => {
    if (!isMounted) {
      setMounted(true);
      delay ? (timerId = setTimeout(loadImage, delay)) : loadImage();
    }
    return () => clearTimeout(timerId);
  }, []);

  return isLoading ? (
    <div className="flex flex-col items-center justify-center text-white text-2xl h-full">
      <IoRestaurantOutline className="animate-spin-slow text-4xl text-my-yellow" />
    </div>
  ) : (
    <img width="100%" src={src} className="hover:animate-pulse" />
  );
};

const Carousel = () => {
  const [, setTimestamp] = useState(0);
  const onLoad = () => setTimestamp(Date.now());

  const items = [
    <LazyLoader
      onLoad={onLoad}
      onDragStart={handleDragStart}
      src={Img1}
      delay={2000}
      alt="presentation"
    />,
    <LazyLoader
      onLoad={onLoad}
      onDragStart={handleDragStart}
      src={Img4}
      delay={1000}
      alt="presentation"
    />,
    <LazyLoader
      onLoad={onLoad}
      onDragStart={handleDragStart}
      src={Img2}
      delay={3000}
      alt="presentation"
    />,
    <LazyLoader
      onLoad={onLoad}
      onDragStart={handleDragStart}
      src={Img5}
      delay={2000}
      alt="presentation"
    />,
  ];

  return (
    <div className="bg-theme-dark">
      <AliceCarousel
        items={items}
        autoPlay="true"
        autoPlayInterval="1500"
        infinite="true"
        animationType="fadeout"
        animationDuration="2000"
        responsive={{
          0: {
            items: 1,
            itemsFit: "contain",
          },
          768: { items: 2, itemsFit: "contain" },
          1024: {
            items: 3,
            itemsFit: "contain",
          },
        }}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPrevButton}
        disableDotsControls
      />
    </div>
  );
};

export default Carousel;
