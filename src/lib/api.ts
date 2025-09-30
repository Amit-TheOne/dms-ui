import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const token = localStorage.getItem("dms_token");
if (token) api.defaults.headers.common["token"] = token;

export default api;