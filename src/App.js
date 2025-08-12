import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Footer, ScrollToTop } from "./components";
import {
  Home,
  Login,
  Register,
  Menu,
  Reservation,
  Contact,
  About,
  Profile,
} from "./pages";
import Adminpage from "./admin/Adminpage";

const App = (props) => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Adminpage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
