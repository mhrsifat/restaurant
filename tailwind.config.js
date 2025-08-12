/* @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-dark": "#212121",
        "my-yellow": "#dcca87",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        titleFont: ["Cormorant Upright", "serif"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        "landing-img1": "url('./img/landing-img1.jpg')",
        "landing-img2": "url('./img/landing-img2.jpg')",
        "special-event": "url('./img/special-event.jpg')",
        main: "url('./img/main.jpg')",
        starter: "url('./img/starter.jpg')",
        dessert: "url('./img/dessert.jpg')",
        drinks: "url('./img/drinks.jpg')",
        "menu-page": "url(./img/menu-page.jpg)",
        "reservation-page": "url(./img/reservation-page.jpg)",
        "contact-page": "url(./img/contact-page.jpg)",
        "about-page": "url(./img/about-page.jpg)",
        "profile-page": "url(./img/profile-page.jpg)",

        "bg-footer": "url('./img/bg-footer.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
