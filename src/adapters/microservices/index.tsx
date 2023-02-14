import axios from "axios";
import config from "../../utils/config";

const ACCESS_TOKEN =
    config.OAUTH2_ACCESS_TOKEN !== ""
        ? config.OAUTH2_ACCESS_TOKEN
        : sessionStorage.getItem("access_token");

const instance = axios.create({
    baseURL: config.JAVA_API_URL,
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    },
});

export const getData = (endPoint: string) => {
    return instance.get(endPoint);
};

export const postData = (endPoint: string, requestData: any) => {
    const data = requestData;
    return instance.post(endPoint, data);
};

export const putData = (endPoint: string, requestData: any) => {
    const data = requestData;
    return instance.put(endPoint, data);
};

export const deleteData = (endPoint: string) => {
    return instance.delete(endPoint);
};
