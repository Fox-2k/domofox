import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get mode from API
   */
  getMode () {
    const url = `http://${document.location.hostname}:3000/api/mode`
    return axios.get(url)
  },

  /**
   * Update mode to API
   * @param {Number} value mode value
   */
  setMode (value) {
    const url = `http://${document.location.hostname}:3000/api/mode`
    return axios.put(url, { value })
  }
}
