import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_USER_API || "http://localhost:5000/api";
console.log("Base URL:", baseUrl);
const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
