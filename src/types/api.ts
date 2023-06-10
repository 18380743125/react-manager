/**
 * 接口类型定义
 */

export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

export namespace Login {
  export interface params {
    userName: string
    userPwd: string
  }
}

export namespace User {
  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
  }
}
