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
  }
}
