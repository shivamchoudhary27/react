import axios from "axios";
import config from "../../utils/config";

const axiosConfig = {
   axiosInstance : null
};

const createCoreAxiosInstance = (ACCESS_TOKEN) => {
    const instance = axios.create({
        baseURL: config.CORE_SERVICE_URL,
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
    });
    axiosConfig.axiosInstance = instance;
}

export { createCoreAxiosInstance, axiosConfig };