import axios from "axios";
const prod = {
  local: "http://localhost:5000/api/",
  dev: "https://paystack-server-ckku.onrender.com/api/",
};
export const api = axios.create({ baseURL: prod.dev });
