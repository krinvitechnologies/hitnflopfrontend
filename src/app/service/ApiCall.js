import axios from "axios";
import { BASE_URL } from "./helper.js";

axios.defaults.withCredentials = true;
export const axiosRequest = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export default axiosRequest;
