import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reserveTable } from "../actions/userActions";

const Reservation = () => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState("");

  const cart = JSON.parse(localStorage.getItem("cart"));

  const [numOfPerson, setNumOfPerson] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  // console.log(numOfPerson, date, time, message);

  const handleBooking = (e) => {
    if (!localStorage.getItem("userInfo")) navigate("/login");

    e.preventDefault();

    const courses = JSON.parse(localStorage.getItem("cart")).map(
      (course) => course.id
    );

    // console.log(courses);

    let num_of_person = 0;

    if (numOfPerson === "1 person") num_of_person = 1;
    else if (numOfPerson === "2 person") num_of_person = 2;
    else if (numOfPerson === "4 person") num_of_person = 4;
    else if (numOfPerson === "8 person") num_of_person = 8;
    else if (numOfPerson === "10 person") num_of_person = 10;
    else num_of_person = numOfPerson;

    const reserveInfo = {
      num_of_person,
      date,
      time,
      message,
      user_id: JSON.parse(localStorage.getItem("userInfo")).user_id,
      courses,
    };

    // console.log(reserveInfo);

    reserveTable(reserveInfo).then((res) => {
      setAlert(res.data);

      if (res.status === 200) {
        localStorage.setItem("cart", "[]");
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
    });
  };

  return (
    <div className="reservation">
      <div class="flex flex-col items-center gap-5 justify-center h-screen bg-fixed bg-center bg-cover bg-reservation-page">
        <h2 class="text-white text-6xl px-5 md:text-8xl font-titleFont font-extrabold capitalize">
          Table Reservations
        </h2>
      </div>

      <div class="bg-theme-dark px-10 flex flex-col items-center">
        <span class="pt-20 pb-10 font-titleFont text-my-yellow capitalize font-semibold text-4xl tracking-wider">
          courses reserved
        </span>

        <div
          class={`grid grid-cols-1 ${
            cart && !(cart.length === 0) ? "lg:grid-cols-2" : ""
          } gap-8 pb-10`}
        >
          {cart && !(cart.length === 0) ? (
            cart.map((item) => {
              return (
                <div className="md:flex items-center justify-between text-white py-4">
                  <div>
                    <span className="text-my-yellow font-titleFont text-3xl font-bold">
                      {item.food_name}
                    </span>
                    <span className="float-right pr-10 font-titleFont text-3xl font-bold">
                      $ {item.price}
                    </span>
                    <p className="py-5">{item.description}</p>
                    <p className="py-5 text-sm italic text-gray-400">
                      {item.type}
                    </p>
                  </div>
                  <img
                    src={item.img}
                    alt={item.food_name}
                    className="w-44 h-44 rounded-full"
                  />
                </div>
              );
            })
          ) : (
            <Link to="/menu" className="text-white text-center hover:underline">
              Choose courses now!
            </Link>
          )}
        </div>

        <span class="pt-20 pb-10 font-titleFont text-my-yellow capitalize font-semibold text-4xl tracking-wider">
          book a table
        </span>

        <form action="" className="w-full md:px-36">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 text-gray-300">
            <select
              name="person"
              id="person"
              onChange={(e) => setNumOfPerson(e.target.value)}
              className=" bg-neutral-800 bg-opacity-60 py-4 px-4 border border-gray-500 focus:border-my-yellow focus:ring-my-yellow"
            >
              <option value="persons">Persons</option>
              <option value="1 person">1 person</option>
              <option value="2 person">2 person</option>
              <option value="4 person">4 person</option>
              <option value="8 person">8 person</option>
              <option value="10 person">10 person</option>
            </select>

            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className="bg-neutral-800 bg-opacity-60 py-4 px-4 border border-gray-500 focus:border-my-yellow focus:ring-my-yellow"
            />

            <input
              type="time"
              onChange={(e) => setTime(e.target.value)}
              className="bg-neutral-800 bg-opacity-60 py-4 px-4 border border-gray-500 focus:border-my-yellow focus:ring-my-yellow"
            />

            <textarea
              name="message"
              id="message"
              rows="6"
              placeholder="Tell us more information ..."
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-full bg-neutral-800 bg-opacity-60 my-2 py-4 px-4 border border-gray-500 focus:border-my-yellow focus:ring-my-yellow"
            ></textarea>

            <p
              class={`text-md ${
                alert ===
                "Your reservations has been sent. Contact us for detail request!"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {alert}
            </p>

            <button
              onClick={handleBooking}
              className="col-span-full w-full py-3 border border-my-yellow text-white font-serif hover:bg-my-yellow hover:duration-200 hover:-translate-y-1 hover:translate-x-1 hover:text-black"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
