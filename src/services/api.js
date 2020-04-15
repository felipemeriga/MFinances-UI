import axios from "axios"

const API_ROOT = 'http://localhost:8080/api/categories';
// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export function callApi(endpoint, schema) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

    return axios({
        method: 'get',
        url: API_ROOT,
        data: {
            firstName: 'Finn',
            lastName: 'Williams'
        }
    }) .then(response => {
        if (!response.status === 200 && !response.status === 204) {
            return Promise.reject(response)
        }
        return Promise.resolve(response.data);
    })
}
