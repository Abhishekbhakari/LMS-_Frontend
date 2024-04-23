import axios from "axios";

const BASE_URL = "https://lms-backend-nfn6hnrcm-abhisheks-projects-3276e3cb.vercel.app/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
