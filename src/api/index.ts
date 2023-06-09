import request from '@/utils/request'
import { Login } from '@/types/api'

export default {
  login(params: Login.params) {
    return request.post<string>('/users/login', params, { showLoading: false, showError: true })
  }
}
