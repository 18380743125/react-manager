import { create } from 'zustand'
import { User } from '@/types/api'

interface IState {
  collapsed: boolean
  token: string
  userInfo: {
    userEmail: string
    userName: string
  }
  updateCollapsed: () => void
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
}

const useStore = create<IState>(set => ({
  collapsed: false,
  token: '',
  userInfo: {
    userEmail: '',
    userName: ''
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
