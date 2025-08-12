import React, { useState, useEffect } from "react";
import { reservationByUser } from "../actions/userActions";

import { OrderByReservation } from "../components";

import Avatar from "../img/avatar.jpg";

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    reservationByUser(userInfo.user_id).then((res) => {
      if (res.status === 201) setReservation(201);
      else setReservation(res.data);
    });
  }, [userInfo]);

  return (
    <div className="profile">
      <div class="flex flex-col items-center gap-5 justify-center h-screen bg-fixed bg-center bg-cover bg-profile-page">
        <h2 class="text-white text-6xl px-5 md:text-8xl font-titleFont font-extrabold capitalize">
          Welcome, {userInfo.fullname}
        </h2>
      </div>

      <p class="py-14 text-center font-titleFont text-my-yellow capitalize font-semibold text-4xl tracking-wider">
        Your profile
      </p>
      <div className="w-2/3 lg:w-1/2 mx-auto border border-my-yellow py-10 flex flex-col md:flex-row gap-5 justify-evenly items-center">
        <img
          src={Avatar}
          alt="user-avatar"
          className="w-56 mx-5 rounded-full"
        />
        <div className="flex flex-col text-gray-300 gap-2 px-5">
          <p className="font-titleFont text-2xl text-my-yellow pb-10">
            Avant Garden Customer Card
          </p>
          <p>
            Full Name:{" "}
            <span className="text-my-yellow">{userInfo.fullname}</span>
          </p>
          <p>
            Email: <span className="text-my-yellow">{userInfo.email}</span>
          </p>
          <p>
            Phone: <span className="text-my-yellow">{userInfo.phone}</span>
          </p>
        </div>
      </div>

      <p class="py-14 text-center font-titleFont text-my-yellow capitalize font-semibold text-4xl tracking-wider">
        Your reservation
      </p>

      <div>
        <div class="md:px-10 lg:px-40 mb-14 w-full drop-shadow rounded-md">
          {reservation === 201 ? (
            <p className="mb-14 text-gray-300">No Reservation Yet</p>
          ) : (
            reservation.map((item) => {
              return (
                <details class="bg-gray-300 open:bg-amber-200 duration-300">
                  <summary class="bg-inherit px-5 py-3 text-lg cursor-pointer">
                    ID: {item.id} - Persons: {item.numOfPerson} - Date:{" "}
                    {item.date} - Time: {item.time} - Reserved at:{" "}
                    {item.createdAt}
                  </summary>
                  <div class="bg-white px-5 py-3 border border-gray-300 text-sm font-light">
                    <OrderByReservation id={item.id} />
                  </div>
                </details>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
