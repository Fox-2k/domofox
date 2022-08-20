import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get hysteresis from API
   */
  getHysteresis (sign) {
    const url = `http://${document.location.hostname}:3000/api/hysteresis/${sign}`
    return axios.get(url)
  },

  /**
   * Update hysteresis to API
   * @param {String} sign hysteresis sign
   * @param {Number} value hysteresis value
   */
  setHysteresis (sign, value) {
    const url = `http://${document.location.hostname}:3000/api/hysteresis/${sign}`
    return axios.put(url, { value })
  }
}
