import { AxiosRequestConfig } from 'axios';
import { axiosConfig, createAxiosInstance } from "./utils";

const ACCESS_TOKEN = sessionStorage.getItem("access_token") ?? localStorage.getItem("access_token"); 

createAxiosInstance(ACCESS_TOKEN); // to reset the instance if app is refreshed

export const getData = (endPoint: string, params : any) => {
    const instance = axiosConfig.axiosInstance;
    return instance.get(endPoint, { params });
};

export const postData = (endPoint: string, requestData: any, file?: File, component: string = '') => {
    const instance = axiosConfig.axiosInstance;
    const data = requestData;
    
    if (file) {
        let headers: AxiosRequestConfig['headers'] = {};
        // Set Content-Type header to 'multipart/form-data' if file is provided
        headers['Content-Type'] = 'multipart/form-data';

        // Create a FormData object to send the file and other data as multipart/form-data
        const formData = new FormData();
        formData.append('files', file);
        Object.entries(data).forEach(([key, value]) => {
           formData.append(key, value);
        });

        // Send the FormData as the request data
        return instance.post(endPoint, formData, { headers });
    }
    return instance.post(endPoint, data);
};

export const putData = (endPoint: string, requestData: any, file?: File, component: string = '') => {
    const instance = axiosConfig.axiosInstance;
    const data = requestData;
    
    if (file) {
        const {formData, headers} = handleFileFields(data, file);
        return instance.put(endPoint, formData, { headers });
    }

    return instance.put(endPoint, data);
};

export const deleteData = (endPoint: string, params: any = {}) => {
    const instance = axiosConfig.axiosInstance;
    return instance.delete(endPoint, { params});
};

// Set Content-Type header to 'multipart/form-data' if file is provided
// Create a FormData object to send the file and other data as multipart/form-data
function handleFileFields (data: any ,file: File) {
    let headers: AxiosRequestConfig['headers'] = {};
    headers['Content-Type'] = 'multipart/form-data';

    const formData = new FormData();
    formData.append('file', file);
    Object.entries(data).forEach(([key, value]) => {
       formData.append(key, JSON.stringify(value));
    });

    return {formData, headers}
}