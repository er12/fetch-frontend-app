import axios from "axios";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

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

        // TODO: Handle 401 Unauthorized error
        // window.location.href = '/login';
        // NextResponse.redirect(new URL('/login', window.location.origin));
        return Promise.reject(error);
    }
);

export default api;