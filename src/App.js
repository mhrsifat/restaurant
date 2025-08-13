import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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
import AdminLayout from "./admin/AdminLayout";
import Adminpage from "./admin/Adminpage";
import AdminUsers from "./admin/AdminUsers"; // example

const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Adminpage />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;