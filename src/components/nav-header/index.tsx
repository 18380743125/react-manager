import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'

import storage from '@/utils/storage'
import useStore from '@/store'
import styles from './index.module.less'

const NavHeader = () => {
  const { userInfo, collapsed, updateCollapsed } = useStore()
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]
  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱：' + userInfo.userEmail
    },
    {
      key: 'logout',
      label: '退出'
    }
  ]

  // 控制菜单图标关闭和展开
  const toggleCollapsed = () => {
    updateCollapsed()
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    }
  }

  return (
    <div className={styles['nav-header']}>
      <div className={styles['left']}>
        <div onClick={toggleCollapsed}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className={styles['right']}>
        <Dropdown className={styles['user-info']} menu={{ items, onClick }} trigger={['click']}>
          <span className={styles['nickname']}> {userInfo.userName}</span>
        </Dropdown>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} />
      </div>
    </div>
  )
}

export default NavHeader
