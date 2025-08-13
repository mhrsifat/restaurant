// src/actions/adminActions.js
import axios from "axios";

const ADMIN_MENU_API_URL = "http://localhost/restaurant_server/admin/menu";
const ADMIN_RESERVATION_API_URL = "http://localhost/restaurant_server/admin/reservation";
const ADMIN_USER_API_URL = "http://localhost/restaurant_server/admin/user"; // optional if you create user endpoints
const ADMIN_AUTH_API_URL = "http://localhost/restaurant_server/admin/auth"; // optional if you create user endpoints
const ADMIN_INFO_API_URL = "http://localhost/restaurant_server/admin/info"; // optional if you create user endpoints

export const adminLogin = (data) => axios.post(`${ADMIN_AUTH_API_URL}/login.php`, data);

// info 
export const getTotalUsers = () => axios.get(`${ADMIN_INFO_API_URL}/totaluser.php`);


/* ---------- Menu (Admin) ---------- */
export const getAdminMenu = () => axios.get(`${ADMIN_MENU_API_URL}/readMenu.php`);
export const getAdminMenuById = (id) => axios.get(`${ADMIN_MENU_API_URL}/readMenuById.php`, { params: { id } });
export const addAdminMenuItem = (menuData) => axios.post(`${ADMIN_MENU_API_URL}/createMenu.php`, menuData);
export const updateAdminMenuItem = (menuData) => axios.post(`${ADMIN_MENU_API_URL}/updateMenu.php`, menuData);
export const deleteAdminMenuItem = (id) => axios.post(`${ADMIN_MENU_API_URL}/deleteMenu.php`, { id });

/* ---------- Reservations (Admin) ---------- */
export const getAdminReservations = () => axios.get(`${ADMIN_RESERVATION_API_URL}/readReservations.php`);
export const getAdminReservationById = (id) => axios.get(`${ADMIN_RESERVATION_API_URL}/readReservation.php`, { params: { id } });
export const createAdminReservation = (data) => axios.post(`${ADMIN_RESERVATION_API_URL}/createReservation.php`, data);
export const updateAdminReservation = (data) => axios.post(`${ADMIN_RESERVATION_API_URL}/updateReservation.php`, data);
export const deleteAdminReservation = (reservation_id) => axios.post(`${ADMIN_RESERVATION_API_URL}/deleteReservation.php`, { reservation_id });

/* ---------- Users (Admin) - OPTIONAL ---------- */
/* export const getAdminUsers = () => axios.get(`${ADMIN_USER_API_URL}/readUsers.php`);
   export const getAdminUserById = (id) => axios.get(`${ADMIN_USER_API_URL}/readUser.php`, { params: { id } });
*/
