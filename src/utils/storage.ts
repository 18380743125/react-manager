/**
 * 封装 storage
 */

export default {
  /**
   * storage存储
   * @param key {string} 参数名称
   * @param value {unknown} 写入值
   */
  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  /**
   * storage读取
   * @param key {string} 参数名称
   * @returns storage值
   */
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  /**
   * 删除localStorage值
   * @param key {string} 参数名称
   */
  remove(key: string) {
    localStorage.removeItem(key)
  },
  /**
   * 清空localStorage值
   */
  clear() {
    localStorage.clear()
  }
}
