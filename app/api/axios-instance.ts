import axios from "axios";
import { env } from "process";

const API_BASE_URL = env.API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Response interceptor (for handling errors globally)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;