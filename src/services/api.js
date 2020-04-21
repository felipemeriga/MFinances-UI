import axios from "axios";

const API_ROOT = 'http://localhost:8080/api/';
// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export function callApi(payload) {
    const endpoint = payload.config.endpoint;
    const requestArgs = payload.config.arguments;
    let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    if(requestArgs !== '') {
        fullUrl = fullUrl + '?' + requestArgs;
    }
    return axios({
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
