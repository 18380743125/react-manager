import { message } from "antd"
import axios, { AxiosError } from "axios"
import { showLoading, hideLoading } from "@/utils/loading"

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8 * 1000,
  timeoutErrorMessage: "请求超时，请稍后再试",
  withCredentials: true
})

instance.interceptors.request.use(
  config => {
    showLoading()
    const token = localStorage.getItem("token")
    if (token) config.headers.Authorization = token
    return {
      ...config
    }
  },
  (err: AxiosError) => {
    hideLoading()
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(response => {
  const data = response.data
  hideLoading()
  if (data.code === 50001) {
    message.error(data.msg)
    localStorage.removeItem("token")
    location.href = "/login"
  }
  if (data.code !== 0) {
    message.error(data.msg)
    return Promise.reject(data)
  }
  return data.data
})

export function get<T>(url: string, params?: object): Promise<T> {
  return instance.get(url, { params })
}

export function post<T>(url: string, params?: object): Promise<T> {
  return instance.post(url, { params })
}
