import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get heating state from API
   */
  getHeating () {
    const url = `http://${document.location.hostname}:3000/api/heater/heating`
    return axios.get(url)
  }

}
