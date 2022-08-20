import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get plannings from API
   */
  getPlannings () {
    const url = `http://${document.location.hostname}:3000/api/plannings`
    return axios.get(url)
  },

  /**
   * Add planning to API
   * @param {Object} value planning details
   */
  addPlanning (value) {
    const url = `http://${document.location.hostname}:3000/api/plannings/`
    return axios.post(url, value)
  },

  /**
   * Update planning to API
   * @param {String} id planning unique id
   * @param {Object} value planning details
   */
  setPlanning (id, value) {
    const url = `http://${document.location.hostname}:3000/api/plannings/${id}`
    return axios.put(url, value)
  },

  /**
   * Delete a planning
   * @param {String} id planning unique id
   */
  deletePlanning (id) {
    const url = `http://${document.location.hostname}:3000/api/plannings/${id}`
    return axios.delete(url)
  },

  /**
   * Create a default planning
   */
  createPlanning () {
    const now = new Date()
    const defaultPlanning = {
      time: {
        hour: now.getHours(),
        min: now.getMinutes()
      },
      setpoint: 19,
      active: false,
      days: Array(7).fill(true)
    }
    return this.addPlanning(defaultPlanning)
  }
}
