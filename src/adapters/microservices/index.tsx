import { axiosConfig, createAxiosInstance } from "./utils";

const ACCESS_TOKEN = sessionStorage.getItem("access_token") ?? localStorage.getItem("access_token"); 

createAxiosInstance(ACCESS_TOKEN); // to reset the instance if app is refreshed

export const getData = (endPoint: string) => {
    let requestEndpoint = `${endPoint}?pageNumber=0&pageSize=20`;
    const instance = axiosConfig.axiosInstance;
    return instance.get(requestEndpoint);
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
