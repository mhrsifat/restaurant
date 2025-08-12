import React from "react";

const Contact = () => {
  return (
    <div className="contact">
      <div class="flex flex-col items-center gap-5 justify-center h-screen bg-fixed bg-center bg-cover bg-contact-page">
        <h2 class="text-black text-6xl px-5 md:text-8xl font-titleFont font-extrabold capitalize">
          Contact Us
        </h2>
      </div>

      <div className="py-14 text-center">
        <span class="font-titleFont text-my-yellow capitalize font-semibold text-4xl tracking-wider">
          Have a question or general inquiry? Get in touch!
        </span>

        <p className="uppercase text-white pt-10">
          YOU CAN EMAIL US DIRECTLY:{" "}
          <a
            href="mailto:avantgarden@gmail.com"
            className="hover:text-my-yellow"
          >
            avantgarden@gmail.com
          </a>
        </p>
        <p className="uppercase text-white py-5">
          or call us:{" "}
          <a href="tel:0935302341" className="hover:text-my-yellow">
            0935302341
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
