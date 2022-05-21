import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get heating state from API
   */
  getHeating () {
    const API_URL = Vue.prototype.$config.API_URL
    const url = `${API_URL}/api/heater/heating`
    return axios.get(url)
  }

}
