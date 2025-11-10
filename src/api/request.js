import axios from 'axios'
const service = axios.create(
    {
        baseURL: 'http://120.24.185.26:8081',
        timeout: 5000
    }
)
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = "Bearer " + token
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
export default service
