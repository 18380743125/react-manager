import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'
import { message } from '@/utils/AntdGlobal'
import useStore from '@/store'

import styles from './index.module.less'

const LoginFC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const updateToken = useStore(state => state.updateToken)

  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      const data = await api.login(values)
      setLoading(false)
      storage.set('token', data)
      updateToken(data)
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        navigate(params.get('callback') || '/welcome')
      }, 1000)
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className={styles['login']}>
      <div className={styles['content']}>
        <div className={styles['title']}>系统登录</div>
        <Form name='basic' onFinish={onFinish} autoComplete='off'>
          <Form.Item name='userName' rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginFC
