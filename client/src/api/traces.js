import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get trace from API
   */
  getTraces (code, from, to, table) {
    const url = new URL(`http://${document.location.hostname}:3000/api/traces/${code}`)
    url.searchParams.append("from", from)
    url.searchParams.append("to", to)
    if(table) url.searchParams.append("table", table)

    return axios.get(url)
  },
  
}
