// src/actions/adminActions.js
import axios from "axios";

/*
  Base URLs
  - Adjust host (localhost) if your backend sits on a different domain/port.
*/
const USER_API_URL = "http://localhost/restaurant_server/api/auth";
const MENU_API_URL = "http://localhost/restaurant_server/api/menu";
const RESERVATION_API_URL = "http://localhost/restaurant_server/api/reservation";
const ORDER_API_URL = "http://localhost/restaurant_server/api/order";

const ADMIN_MENU_API_URL = "http://localhost/restaurant_server/admin/menu";
const ADMIN_RESERVATION_API_URL = "http://localhost/restaurant_server/admin/reservation";

/* ---------------- Public / normal user APIs ---------------- */

export const register = (userInfo) => {
  return axios.post(`${USER_API_URL}/register.php`, userInfo);
};

export const login = (user) => {
  return axios.post(`${USER_API_URL}/login.php`, user);
};

/**
 * Get public menu (filter by `type` if provided)
 * Example: getMenu() or getMenu('drinks')
 */
export const getMenu = (type) => {
  return axios.get(`${MENU_API_URL}/readMenu.php`, { params: { type } });
};

export const reserveTable = (reserveInfo) => {
  // reserveInfo should be an object, sent as JSON
  return axios.post(`${RESERVATION_API_URL}/createReservation.php`, reserveInfo);
};

/**
 * If your backend expects POST for readByUser, change this to axios.post
 * Current: GET with query param
 */
export const reservationByUser = (user_id) => {
  return axios.get(`${RESERVATION_API_URL}/readByUser.php`, { params: { user_id } });
};

export const orderByReservation = (reservationId) => {
  return axios.get(`${ORDER_API_URL}/readOrder.php`, { params: { id: reservationId } });
};

/* ---------------- Admin: Menu APIs ---------------- */

/**
 * Get all menu items (admin)
 */
export const getAdminMenu = () => {
  return axios.get(`${ADMIN_MENU_API_URL}/readMenu.php`);
};

/**
 * Get single menu item by id
 */
export const getAdminMenuById = (id) => {
  return axios.get(`${ADMIN_MENU_API_URL}/readMenuById.php`, { params: { id } });
};

/**
 * Create a menu item (menuData: object)
 * example menuData: { food_name, description, img, price, type }
 */
export const addAdminMenuItem = (menuData) => {
  return axios.post(`${ADMIN_MENU_API_URL}/createMenu.php`, menuData);
};

/**
 * Update a menu item (menuData must include food_id)
 */
export const updateAdminMenuItem = (menuData) => {
  return axios.post(`${ADMIN_MENU_API_URL}/updateMenu.php`, menuData);
};

/**
 * Delete menu item by id
 * Backend sample expects JSON: { id }
 */
export const deleteAdminMenuItem = (id) => {
  return axios.post(`${ADMIN_MENU_API_URL}/deleteMenu.php`, { id });
};

/* ---------------- Admin: Reservations (if you want admin endpoints) ---------------- */

export const getAdminReservations = () => {
  return axios.get(`${ADMIN_RESERVATION_API_URL}/readReservations.php`);
};

export const getAdminReservationById = (id) => {
  return axios.get(`${ADMIN_RESERVATION_API_URL}/readReservation.php`, { params: { id } });
};

/**
 * Optional helpers if you implement admin create/update/delete for reservations:
 *
 * export const createAdminReservation = (data) => axios.post(`${ADMIN_RESERVATION_API_URL}/createReservation.php`, data);
 * export const updateAdminReservation = (data) => axios.post(`${ADMIN_RESERVATION_API_URL}/updateReservation.php`, data);
 * export const deleteAdminReservation = (id) => axios.post(`${ADMIN_RESERVATION_API_URL}/deleteReservation.php`, { reservation_id: id });
 *
 * Uncomment & use if you create those endpoints.
 */
