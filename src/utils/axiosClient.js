import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://elearning0706.cybersoft.edu.vn/api",
})

// tự động thêm accessToken nếu cần có

axiosClient.interceptors.request.use((config) => {
    // const {accessToken} = JSON.parse(localStorage.getItem("user") || {});
    const { user } = localStorage.getItem("user");
    if (user) {
        const { accessToken } = JSON.parse(user);
        config.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

export default axiosClient;