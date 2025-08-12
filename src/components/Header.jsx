import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaBars, FaRegUser } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";

import ToogleImg from "../img/img3.jpg";
import Logo from "../img/logo.png";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
};

const Header = () => {
  const scrollDirection = useScrollDirection();

  // Save user login
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(JSON.parse(userInfo));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const [toogleMenu, setToogleMenu] = useState(false);

  const linkClassName =
    "font-titleFont font-semibold text-xl hover:text-my-yellow hover:duration-300";
  const linkToogleClassName =
    "py-2.5 font-titleFont font-semibold text-xl hover:text-my-yellow hover:duration-300";

  return (
    <nav
      className={`fixed w-full bg-black bg-opacity-80 z-50 text-white h-20 shadow-lg flex justify-between py-4 px-8 ${
        scrollDirection === "down" ? "-top-20" : "top-0"
      } transition-all duration-500`}
    >
      <Link
        to="/"
        className="flex items-center z-50 w-72 hover:scale-110 duration-500"
        onClick={() => {
          setToogleMenu(false);
        }}
      >
        <img src={Logo} alt="avant-garden-logo" />
      </Link>
      <ul className="hidden lg:flex gap-6 items-center">
        <li>
          <Link to="/" className={linkClassName}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/menu" className={linkClassName}>
            Menu
          </Link>
        </li>
        <li>
          <Link to="/about" className={linkClassName}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className={linkClassName}>
            Contact
          </Link>
        </li>
        {/* <li>
          <Link to="/news" className={linkClassName}>
            News
          </Link>
        </li> */}
      </ul>

      <div className="hidden md:flex items-center gap-8">
        <div className="py-2 px-4 border-y-2 border-my-yellow font-bold font-titleFont tracking-wide text-xl hover:bg-my-yellow hover:duration-200 hover:-translate-y-1 hover:translate-x-1 hover:text-black">
          <Link to="/reservation">Table Reservation</Link>
        </div>

        {userInfo ? (
          <Link to="/profile" className=" text-2xl flex items-center gap-4">
            <FaRegUser className="hover:text-my-yellow duration-500" />
            <div className="text-sm hover:text-red-600" onClick={handleLogout}>
              Log out
            </div>
          </Link>
        ) : (
          <Link
            to="/login"
            className="hover:text-my-yellow duration-500 text-sm"
          >
            Login / Register
          </Link>
        )}
      </div>

      <div className="flex items-center text-2xl cursor-pointer lg:hidden">
        <FaBars
          onClick={() => {
            setToogleMenu(true);
          }}
        />
      </div>

      {
        <div
          className={`overflow-y-auto bg-bg-footer fixed right-0 top-0 bg-black w-full h-full ${
            toogleMenu ? "translate-x-0" : "translate-x-full"
          } ease-in-out duration-500 z-40`}
        >
          <MdRestaurantMenu
            className="text-3xl float-right my-8 mx-5 hover:text-my-yellow"
            onClick={() => {
              setToogleMenu(false);
            }}
          />

          <div className="flex items-start justify-between">
            <img
              src={ToogleImg}
              alt="menu"
              className="hidden md:block w-2/3 mt-32 ml-10 mb-11 border-2 border-my-yellow"
            />
            <ul className="leading-10 py-32 pl-10">
              <li className={linkToogleClassName}>
                <Link
                  to="/"
                  onClick={() => {
                    setToogleMenu(false);
                  }}
                >
                  Home
                </Link>
              </li>
              <li className={linkToogleClassName}>
                <Link
                  to="/menu"
                  onClick={() => {
                    setToogleMenu(false);
                  }}
                >
                  Menu
                </Link>
              </li>
              <li className={linkToogleClassName}>
                <Link
                  to="/about"
                  onClick={() => {
                    setToogleMenu(false);
                  }}
                >
                  About
                </Link>
              </li>
              <li className={linkToogleClassName}>
                <Link
                  to="/contact"
                  onClick={() => {
                    setToogleMenu(false);
                  }}
                >
                  Contact
                </Link>
              </li>

              <li className={linkToogleClassName}>
                <Link
                  to="/reservation"
                  onClick={() => {
                    setToogleMenu(false);
                  }}
                >
                  Table Reservation
                </Link>
              </li>

              {!userInfo ? (
                <li className={linkToogleClassName}>
                  <Link
                    to="/login"
                    onClick={() => {
                      setToogleMenu(false);
                    }}
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <>
                  <li className={linkToogleClassName}>
                    <Link
                      to="/profile"
                      onClick={() => {
                        setToogleMenu(false);
                      }}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li className={linkToogleClassName}>
                    <div
                      className="cursor-pointer hover:text-red-600"
                      onClick={handleLogout}
                    >
                      Log out
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      }
    </nav>
  );
};

export default Header;
