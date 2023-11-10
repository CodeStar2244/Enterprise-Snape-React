import axios, { AxiosRequestConfig } from "axios";

const client = axios.create({
    // baseURL: 'https://apis-studio.snape.app/api/v2/enterprise/',
    baseURL: 'http://localhost:3000/api/v2/enterprise/',
});

export const request = (options: AxiosRequestConfig) => {
    const onSuccess = (response: { headers: any; data: any }) => {
        return response.data;
    };
    const onError = (error: {
        config: any;
        response: { status: any; data: any; headers: any };
        message: any;
    }) => {
        return Promise.reject(error.response || error.message);
    };
    return client(options).then(onSuccess).catch(onError);
};

export const requestWithHeaders = (options: AxiosRequestConfig) => {
    const onSuccess = (response: { headers: any; data: any }) => {
        return response;
    };
    const onError = (error: {
        config: any;
        response: { status: any; data: any; headers: any };
        message: any;
    }) => {
        return Promise.reject(error.response || error.message);
    };
    return client(options).then(onSuccess).catch(onError);
};

