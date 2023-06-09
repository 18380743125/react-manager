/**
 * 工具函数封装
 */

// 格式化金额
export const formatMoney = (money: number | string) => {
  const result = parseFloat(money.toString())
  return result.toLocaleString("zh-CN", { style: "currency", currency: "CNY" })
}

// 格式化数字
export const formatNum = (num: number | string) => {
  const result = num.toString()
  if (result.indexOf(".") > -1) return result.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
  return result.replace(/(\d)(?=(\d{3})+$)/g, "$1,")
}

// 格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === "yyyy-MM-dd") return curDate.toLocaleDateString().replaceAll("/", "-")
  if (rule === "HH:mm:ss") return curDate.toLocaleTimeString().replaceAll("/", "-")
  return curDate.toLocaleString().replaceAll("/", "-")
}

// 格式化日期
export const formatDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date

  let fmt = rule || "yyyy-MM-dd HH:mm:ss"
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
  type OType = {
    [key: string]: number
  }
  const O: OType = {
    "M+": curDate.getMonth() + 1,
    "d+": curDate.getDate(),
    "H+": curDate.getHours(),
    "m+": curDate.getMinutes(),
    "s+": curDate.getSeconds()
  }
  for (const k in O) {
    const val = O[k].toString()
    fmt = fmt.replace(new RegExp(`(${k})`), ("00" + val).substring(val.length))
  }
  return fmt
}
