import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get sensors weighted average value from API
   */
  getSensorsAverage () {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/sensors/average`
    return axios.get(url)
  },

  /**
   * Get all sensors from API
   */
  getAllSensors () {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/sensors/`
    return axios.get(url)
  },

  /**
   * Get all sensors from API
   */
  getSensor (id) {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/sensors/${id}`
    return axios.get(url)
  }
}
