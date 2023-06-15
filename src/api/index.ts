import request from '@/utils/request'
import { Dashboard, Login, User } from '@/types/api'

export default {
  // 登录
  login(params: Login.params) {
    return request.post<string>('/users/login', params, { showLoading: false, showError: true })
  },
  // 获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },
  getReportData() {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
  },
  getPieCityData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
  },
  getPieAgeData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
  },
  getRadarData() {
    return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
  }
}
