import axios from "axios";
import config from "../../utils/config";

const axiosConfig = {
   axiosInstance : null
};

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: config.CORE_SERVICE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    axiosConfig.axiosInstance = instance;
}

export { createAxiosInstance, axiosConfig };