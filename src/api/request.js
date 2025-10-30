import axios from 'axios'
const service = axios.create(
    {
        baseURL: 'http://120.24.185.26:8081'
    }
)
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization=token
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
export default service
