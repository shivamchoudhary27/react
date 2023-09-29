import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { axiosConfig, 
    createCoreAxiosInstance
 } from "./utils";

const ACCESS_TOKEN = sessionStorage.getItem("access_token") ?? localStorage.getItem("access_token") ?? ''; 

createCoreAxiosInstance(ACCESS_TOKEN); // to reset the instance if app is refreshed

export const getData = (endPoint: string, params : any, keepBearerToken: boolean = true) => {
    const instance = axiosConfig.axiosInstance;
    // Clone the axios instance configuration
    const modifiedInstance = axios.create(instance.defaults);

    // Modify headers if needed
    if (!keepBearerToken) {
        delete modifiedInstance.defaults.headers['Authorization'];
    }

    return modifiedInstance.get(endPoint, { params });
};

export const postData = (endPoint: string, requestData: any, file?: File, keepBearerToken: boolean = true) => {
    const instance = axiosConfig.axiosInstance;
    const data = requestData;

    const modifiedInstance = axios.create(instance.defaults);

    // Modify headers if needed
    if (!keepBearerToken) {
        delete modifiedInstance.defaults.headers['Authorization'];
    }
    
    if (file) {
        let headers: AxiosRequestConfig['headers'] = {};
        headers['Content-Type'] = 'multipart/form-data';

        const formData = new FormData();
        formData.append('file', file);
        Object.entries(data).forEach(([key, value]) => {
           formData.append(key, value);
        });
        // Send the FormData as the request data
        return modifiedInstance.post(endPoint, formData, { headers });
    }

    return modifiedInstance.post(endPoint, data);
};

export const putData = (endPoint: string, requestData: any, file?: File, keepBearerToken: boolean = true) => {
    const instance = axiosConfig.axiosInstance;
    const data = requestData;

    const modifiedInstance = axios.create(instance.defaults);

    // Modify headers if needed
    if (!keepBearerToken) {
        delete modifiedInstance.defaults.headers['Authorization'];
    }

    return modifiedInstance.put(endPoint, data);
};

export const deleteData = (endPoint: string, keepBearerToken: boolean = true) => {
    const instance = axiosConfig.axiosInstance;
    const modifiedInstance = axios.create(instance.defaults);

    // Modify headers if needed
    if (!keepBearerToken) {
        delete modifiedInstance.defaults.headers['Authorization'];
    }
    return modifiedInstance.delete(endPoint);
};