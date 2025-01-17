import axios from "axios";
const url = "http://localhost:5050"

// Create Axios instance
const api_wrapper = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor to Attach Token
api_wrapper.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3ODdlOWE2NzJiNjMwYWFhMmYwMGY4MiIsIm5hbWUiOiJZZXMiLCJlbWFpbCI6InZpc3Noa3UxMjJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDgkWm1FZlY2NnZtTWtBZkhOWW5Xall1dXQ1YTYzdlcwbEdadnRLY0Q5Y2lnZ2RobEtuRlhkVS4iLCJjcmVhdGVkQXQiOiIyMDI1LTAxLTE1VDE3OjAwOjIyLjAwNVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAxLTE1VDE3OjAwOjIyLjAwNVoifSwiaWF0IjoxNzM3MDUyMzk2fQ.ni4aCNpS-iCpDGo3TjNxRvsTs75y0UKal_zJ92Pb8ug"
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api_wrapper.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const LoginAction = async (data) => {
    try {
        const response = await axios.post(`${url}/auth/login`, data);
        if (response?.data?.status) {
            localStorage.setItem("token", response?.data?.token);
            return { status: true, message: response?.data?.message }
        }
    } catch (error) {
        return { status: false, message: error?.response?.data?.message, error: error }
    }
}

export default api_wrapper;
