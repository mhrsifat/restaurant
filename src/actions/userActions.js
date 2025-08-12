import axios from "axios";

const USER_API_URL = "http://localhost/restaurant_server/api/auth";
const MENU_API_URL = "http://localhost/restaurant_server/api/menu/";
const RESERVATION_API_URL =
  "http://localhost/restaurant_server/api/reservation/";

const ORDER_API_URL = "http://localhost/restaurant_server/api/order/";

export const register = (userInfo) => {
  return axios.post(`${USER_API_URL}/register.php`, userInfo);
};

export const login = (user) => {
  return axios.post(`${USER_API_URL}/login.php`, user);
};

export const getMenu = (type) => {
  return axios.get(`${MENU_API_URL}/readMenu.php?type=${type}`);
};

export const reserveTable = (reserveInfo) => {
  return axios.post(
    `${RESERVATION_API_URL}/createReservation.php`,
    reserveInfo
  );
};

export const reservationByUser = (user_id) => {
  return axios.post(`${RESERVATION_API_URL}/readByUser.php?user_id=${user_id}`);
};

export const orderByReservation = (reservationId) => {
  return axios.post(`${ORDER_API_URL}/readOrder.php?id=${reservationId}`);
};
