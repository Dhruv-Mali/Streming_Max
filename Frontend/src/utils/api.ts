import axios from "axios";

const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001") + "/api/v1",
  headers: {
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  },
  withCredentials: true,
});

export default api;
