import { axiosConfig, createAxiosInstance } from "./utils";

const ACCESS_TOKEN = sessionStorage.getItem("access_token") ?? localStorage.getItem("access_token"); 

createAxiosInstance(ACCESS_TOKEN); // to reset the instance if app is refreshed

export const getData = (endPoint: string) => {
    const instance = axiosConfig.axiosInstance;
    return instance.get(endPoint);
};

export const postData = (endPoint: string, requestData: any) => {
    const instance = axiosConfig.axiosInstance;
    const data = requestData;
    return instance.post(endPoint, data);
};

export const putData = (endPoint: string, requestData: any) => {
    const instance = axiosConfig.axiosInstance;
    const data = requestData;
    return instance.put(endPoint, data);
};

export const deleteData = (endPoint: string) => {
    const instance = axiosConfig.axiosInstance;
    return instance.delete(endPoint);
};
