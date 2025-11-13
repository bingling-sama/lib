import axios from 'axios'
import { notification } from 'antd'

const service = axios.create({
  baseURL: 'http://120.24.185.26:8081',
  timeout: 10000,
})

// 请求拦截：附加 Authorization（带 Bearer 前缀）
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截：统一处理 401 并提示、跳转登录
service.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      notification.error({
        message: '未授权',
        description: '登录已失效，请重新登录',
        placement: 'topRight',
      })
      localStorage.removeItem('token')
      // 直接跳转到登录页（根据路由实际路径调整）
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default service
