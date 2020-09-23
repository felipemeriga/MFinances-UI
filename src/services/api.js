import axios from "axios";
import https from "https";

import {ENVIRONMENT} from "../constants/constants";
import {store} from "../coco";

let API_ROOT ='';
if(ENVIRONMENT === 'development') {
    API_ROOT = 'http://localhost:8080/api/';
} else {
    API_ROOT = 'https://backend.mfinance.me/api/';
}

const api = axios.create({
    baseURL: API_ROOT,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export function callApi(payload) {
    const endpoint = payload.config.endpoint;
    const requestArgs = payload.config.arguments;
    let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    if(requestArgs !== '') {
        fullUrl = fullUrl + '?' + requestArgs;
    }

    return api.request({
        method: payload.method,
        crossDomain: true,
        url: fullUrl,
        data: payload.config.data,
        headers: payload.config.headers
    }).then(response => {
        if (!response.status === 200 && !response.status === 204) {
            return Promise.reject(response);
        }
        return Promise.resolve(response.data);
    });
}

api.interceptors.request.use(async config => {

    if(ENVIRONMENT !== 'development') {
        const currentSession = store.getState().session;
        config.headers.Authorization = `Bearer ${currentSession.credentials.idToken}`;
    }
    return config;
});

