import React, { useCallback, useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import { Outlet } from 'react-router-dom'

import NavHeader from '@/components/nav-header'
import NavFooter from '@/components/nav-footer'
import Menu from '@/components/menu'
import styles from './index.module.less'
import api from '@/api'
import useStore from '@/store'

const { Content, Sider } = Layout

const App: React.FC = () => {
  const { updateUserInfo, collapsed, userInfo } = useStore()

  const getUserInfo = useCallback(async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }, [updateUserInfo])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])
  return (
    <Watermark content={userInfo.userName}>
      <Layout>
        <Sider collapsed={collapsed}>
          <Menu />
        </Sider>
        <Layout>
          <NavHeader />
          <Content className={styles['main']}>
            <div className={styles['content']}>
              <Outlet></Outlet>
            </div>
            <NavFooter />
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
