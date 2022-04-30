import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get setpoint from API
   */
  getSetpoint () {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/setpoint`
    return axios.get(url)
  },

  /**
   * Update setpoint to API
   * @param {Number} value Setpoint value
   */
  setSetpoint (value) {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/setpoint`
    return axios.put(url, { value })
  }
}
