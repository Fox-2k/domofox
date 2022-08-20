import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get setpoint from API
   */
  getSetpoint () {
    const url = `http://${document.location.hostname}:3000/api/setpoint`
    return axios.get(url)
  },

  /**
   * Update setpoint to API
   * @param {Number} value Setpoint value
   */
  setSetpoint (value) {
    const url = `http://${document.location.hostname}:3000/api/setpoint`
    return axios.put(url, { value })
  }
}
