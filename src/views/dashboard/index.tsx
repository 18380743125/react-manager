import { Button, Card, Descriptions } from 'antd'

import { formatMoney, formatNum, formatState } from '@/utils'
import styles from './index.module.less'
import { useCallback, useEffect, useState } from 'react'
import useStore from '@/store'
import api from '@/api'
import { Dashboard } from '@/types/api'
import { useCharts } from '@/hooks/useCharts'

const DashboardCom = () => {
  const { userInfo } = useStore(state => ({ userInfo: state.userInfo }))
  const [report, setReport] = useState<Dashboard.ReportData>()
  const [lineRef, lineInstance] = useCharts()
  const [pieCityRef, pieCityInstance] = useCharts()
  const [pieAgeRef, pieAgeInstance] = useCharts()
  const [radarRef, radarInstance] = useCharts()

  useEffect(() => {
    getReportData()
  }, [])

  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  // 绘制折线图
  const renderLineChart = useCallback(async () => {
    if (!lineInstance) return
    const data = await api.getLineData()
    lineInstance?.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['订单', '流水']
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      xAxis: {
        data: data.label
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: data.order
        },
        {
          name: '流水',
          type: 'line',
          data: data.money
        }
      ]
    })
  }, [lineInstance])

  // 绘制饼图
  const renderPieCityChart = useCallback(async () => {
    if (!pieCityInstance) return
    const data = await api.getPieCityData()
    pieCityInstance?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data
        }
      ]
    })
  }, [pieCityInstance])
  const renderPieAgeChart = useCallback(async () => {
    if (!pieAgeInstance) return
    const data = await api.getPieAgeData()
    pieAgeInstance?.setOption({
      title: {
        text: '年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
        // data: []
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: [50, 120],
          roseType: 'area',
          data: data
        }
      ]
    })
  }, [pieAgeInstance])

  // 绘制雷达图
  const renderRadarChart = useCallback(async () => {
    if (!radarInstance) return
    const data = await api.getRadarData()
    radarInstance?.setOption({
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: data.indicator
      },
      series: {
        name: '模型诊断',
        type: 'radar',
        data: data.data
      }
    })
  }, [radarInstance])

  useEffect(() => {
    renderLineChart()
    renderPieCityChart()
    renderPieAgeChart()
    renderRadarChart()
  }, [renderLineChart, renderPieAgeChart, renderPieCityChart, renderRadarChart])

  return (
    <div className={styles['dashboard']}>
      <div className={styles['user-info']}>
        <img className={styles['user-img']} src={userInfo.userImg} />
        <Descriptions title='欢迎新同学，每天都要开心！'>
          <Descriptions.Item label='用户ID'>{userInfo.userId}</Descriptions.Item>
          <Descriptions.Item label='邮箱'>{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label='状态'>{formatState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label='手机号'>{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>{userInfo.deptName}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className={styles['report']}>
        <div className={styles['card']}>
          <div className={styles['titile']}>司机数量</div>
          <div className={styles['data']}>{formatNum(report?.driverCount || '')}个</div>
        </div>
        <div className={styles.card}>
          <div className={styles['titile']}>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney || '')}元</div>
        </div>
        <div className={styles.card}>
          <div className={styles['titile']}>总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount || '')}单</div>
        </div>
        <div className={styles.card}>
          <div className={styles['titile']}>开通城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum || '')}座</div>
        </div>
      </div>

      {/* 图表 */}
      <div className={styles['chart']}>
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div className={styles['item-chart']} ref={lineRef}></div>
        </Card>
        <Card
          title='司机分布'
          extra={
            <Button
              type='primary'
              onClick={() => {
                renderPieAgeChart()
                renderPieCityChart()
              }}
            >
              刷新
            </Button>
          }
        >
          <div className={styles['pie-chart']}>
            <div className={styles['item-pie']} ref={pieCityRef}></div>
            <div className={styles['item-pie']} ref={pieAgeRef}></div>
          </div>
        </Card>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div className={styles['item-chart']} ref={radarRef}></div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardCom
