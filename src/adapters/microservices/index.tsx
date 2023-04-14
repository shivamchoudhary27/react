import { axiosConfig, createAxiosInstance } from "./utils";

const ACCESS_TOKEN = sessionStorage.getItem("access_token") ?? localStorage.getItem("access_token"); 

createAxiosInstance(ACCESS_TOKEN); // to reset the instance if app is refreshed

export const getData = (endPoint: string, params : any) => {
    const instance = axiosConfig.axiosInstance;
    return instance.get(endPoint, { params });
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
//---------------------------------------------------------------------------------------------------
// import { AxiosRequestConfig } from 'axios';

// export const postData = (endPoint: string, requestData: any, file?: File) => {
//   const instance = axiosConfig.axiosInstance;
//   const data = requestData;
//   let headers: AxiosRequestConfig['headers'] = {};

//   if (file) {
//     // Set Content-Type header to 'multipart/form-data' if file is provided
//     headers['Content-Type'] = 'multipart/form-data';

//     // Create a FormData object to send the file and other data as multipart/form-data
//     const formData = new FormData();
//     formData.append('file', file);
//     Object.entries(data).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     // Send the FormData as the request data
//     return instance.post(endPoint, formData, { headers });
//   }

//   // Send the request data as-is if no file is provided
//   return instance.post(endPoint, data);
// };
//---------------------------------------------------------------------------------------------------
// const TestuploadFile = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     const headers = {
//       Authorization: `Bearer ${ACCESS_TOKEN}`,
//       'Content-Type': 'multipart/form-data',
//     };

//     try {
//       const response = await axiosConfig.axiosInstance.post('/upload', formData, {
//         headers,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
// };
//---------------------------------------------------------------------------------------------------
// export const TestpostWithFile = async (url: string, file: any) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     const config = {
//       headers: { 'content-type': 'multipart/form-data' },
//     };

//     try {
//       const response = await api.post(url, formData, config);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
// };