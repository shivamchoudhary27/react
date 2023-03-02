import axios from "axios";
import config from "../../utils/config";

const axiosConfig = {
   axiosInstance : null
};

const createAxiosInstance = (ACCESS_TOKEN) => {
    const instance = axios.create({
        baseURL: config.JAVA_API_URL,
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
    });
    axiosConfig.axiosInstance = instance;
}

export { createAxiosInstance, axiosConfig};