import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get mode from API
   */
  getMode () {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/mode`
    return axios.get(url)
  },

  /**
   * Update mode to API
   * @param {Number} value mode value
   */
  setMode (value) {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/mode`
    return axios.put(url, { value })
  }
}
