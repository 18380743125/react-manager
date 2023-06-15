import axios from 'axios'
import type { AxiosError } from 'axios'

import storage from './storage'
import { showLoading, hideLoading } from '@/utils/loading'
import { message } from '@/utils/AntdGlobal'
import type { Result } from '@/types/api'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8 * 1000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: 'F8A188C322367EE8'
  }
})

instance.interceptors.request.use(
  config => {
    if (config.showLoading) showLoading()
    const token = storage.get('token')
    if (token) config.headers.Authorization = 'Bearer ' + token
    return config
  },
  (err: AxiosError) => {
    hideLoading()
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(response => {
  const data: Result = response.data
  hideLoading()
  if (data.code === 500001) {
    message.error(data.msg)
    storage.remove('token')
    location.href = '/login'
    return Promise.reject(data)
  }
  if (data.code !== 0) {
    if (response.config.showError) message.error(data.msg)
    else return Promise.resolve(data)
    return Promise.reject(data)
  }
  return data.data
})

interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { ...params })
  },
  post<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.post(url, { ...params }, options)
  }
}
