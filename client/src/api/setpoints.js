import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get setpoint from API
   * @param {String} type Setpoint type
   */
  getSetpoint (type) {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/setpoints/${type}`
    return axios.get(url)
  },

  /**
   * Update setpoint to API
   * @param {String} type Setpoint type
   * @param {Number} value Setpoint value
   * @returns 
   */
  setSetpoint (type, value) {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/setpoints/${type}`
    return axios.put(url, { value })
  }
}
