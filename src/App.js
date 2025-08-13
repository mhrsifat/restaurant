// src/app.js
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
import AdminUsers from "./admin/AdminUsers";
import AdminMenu from "./admin/AdminMenu";
import AdminMenuForm from "./admin/AdminMenuForm";
import MenuDetails from "./admin/MenuDetails";
import AdminReservations from "./admin/AdminReservations";
import ReservationDetails from "./admin/ReservationDetails";
import AdminLogin from "./admin/AdminLogin";
import Invoice from "./admin/Invoice";

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

        {/* Admin login (outside AdminLayout so no sidebar) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin pages (nested under /admin) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Adminpage />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="menu/add" element={<AdminMenuForm />} />
          <Route path="menu/edit/:id" element={<AdminMenuForm />} />
          <Route path="menu/:id" element={<MenuDetails />} />

          <Route path="reservations" element={<AdminReservations />} />
          <Route path="reservations/:id" element={<ReservationDetails />} />

          <Route path="/admin/reservations/:id/invoice" element={<Invoice />} />

          <Route path="users" element={<AdminUsers />} />
          <Route
            path="settings"
            element={<div>Settings page (implement later)</div>}
          />
        </Route>

        {/* fallback */}
        <Route
          path="*"
          element={
            <div className="p-6">
              Open{" "}
              <a href="/admin" className="text-blue-600">
                /admin
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
