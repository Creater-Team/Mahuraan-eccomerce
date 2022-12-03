import axios from "axios";

export const api = axios.create({
  baseURL: "https://mahuraan-ecommerce-server.herokuapp.com/api",
  // baseURL: "http://localhost:5000/api",
});
