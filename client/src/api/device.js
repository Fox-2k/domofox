import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Ask to API to reboot the device
   */
  reboot () {
    const url = `http://${document.location.hostname}:3000/api/device/reboot`
    return axios.post(url)
  },

  /**
   * Ask to API to shutdown the device
   */
   shutdown () {
    const url = `http://${document.location.hostname}:3000/api/device/shutdown`
    return axios.post(url)
  }

}
