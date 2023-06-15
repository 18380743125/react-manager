import { create } from 'zustand'
import { User } from '@/types/api'

interface IState {
  collapsed: boolean
  token: string
  userInfo: User.UserItem
  updateCollapsed: () => void
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
}

const useStore = create<IState>(set => ({
  collapsed: false,
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    deptId: '',
    deptName: '',
    state: 0,
    role: 0,
    roleList: '',
    createId: 0,
    userImg: '',
    userEmail: '',
    userName: '',
    mobile: '',
    job: ''
  },
  updateUserInfo(userInfo: User.UserItem) {
    set({ userInfo })
  },
  updateToken(token: string) {
    set({ token })
  },
  updateCollapsed() {
    set(state => {
      return {
        collapsed: !state.collapsed
      }
    })
  }
}))

export default useStore
