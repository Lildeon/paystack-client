import axios from "axios";
const prod = { local: "http://localhost:5000/api/", dev: "" };
export const api = axios.create({ baseURL: prod.local });
