import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get hysteresis from API
   */
  getHysteresis (sign) {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/hysteresis/${sign}`
    return axios.get(url)
  },

  /**
   * Update hysteresis to API
   * @param {String} sign hysteresis sign
   * @param {Number} value hysteresis value
   */
  setHysteresis (sign, value) {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/hysteresis/${sign}`
    return axios.put(url, { value })
  }
}
