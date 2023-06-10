import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import useStore from '@/store'

import logo from '@/assets/img/logo.png'
import styles from './index.module.less'

const SideMenu = () => {
  const navigate = useNavigate()
  const collapsed = useStore(state => state.collapsed)
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />
        }
      ]
    }
  ]
  const handleLogoClick = () => {
    navigate('/welcome')
  }
  return (
    <div>
      <div className={styles['logo']} onClick={handleLogoClick}>
        <img src={logo} className={styles['img']} />
        {collapsed ? '' : <span>慕慕货运</span>}
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode='inline'
        theme='dark'
        style={
          {
            // width: collapsed ? 80 : 'auto'
          }
        }
        items={items}
      />
    </div>
  )
}

export default SideMenu
