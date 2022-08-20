import Vue from 'vue'
import axios from 'axios'

export default {
  /**
   * Get sensors weighted average value from API
   */
  getSensorsAverage () {
    const url = `http://${document.location.hostname}:3000/api/sensors/average`
    return axios.get(url)
  },

  /**
   * Get all sensors from API
   */
  getAllSensors () {
    const url = `http://${document.location.hostname}:3000/api/sensors/`
    return axios.get(url)
  },

  /**
   * Get all sensors from API
   */
  getSensor (id) {
    const url = `http://${document.location.hostname}:3000/api/sensors/${id}`
    return axios.get(url)
  },

    /**
   * Delete a sensor
   * @param {String} id sensor unique id
   */
  deleteSensor (id) {
    const url = `http://${document.location.hostname}:3000/api/sensors/${id}`
    return axios.delete(url)
  },

  /**
   * add a sensor from API
   */
  addSensor (config) {
    const url = `http://${document.location.hostname}:3000/api/sensors`
    return axios.post(url, config)
  },

  /**
   * Update sensor to API
   * @param {String} id sensor unique id
   * @param {Object} value sensor details
   */
  setSensor (id, value) {
    const url = `http://${document.location.hostname}:3000/api/sensors/${id}`
    return axios.put(url, value)
  },

  /**
   * Create a default sensor
   */
  createSensor() {
    const defaultSensor = {
      label: 'New sensor',
      driver: 'mock.js',
      active: false
    }
    return this.addSensor(defaultSensor)
  }
}
