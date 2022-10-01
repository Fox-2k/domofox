const assert = require('assert')
const state = require('./state')

const driverCache = {}

module.exports = {

  /**
   * Read all configured sensors to store their calibrated values
   */
  async readSensors () {
    for (const sensor of state.config.sensors.filter(sensor => sensor.active)) {
      try {
        // First, get driver instance from cache
        let driver = driverCache[sensor.id]
        if (!driver) {
          // If not available, create a new instance from driver specified in configuration
          const DriverClass = require(`../sensors/${sensor.driver}`)
          driver = new DriverClass(sensor.params)

          // Ensure it has required interface
          assert(typeof driver.read === 'function', 'Sensor driver must implement the read() function')
          assert(typeof driver.init === 'function', 'Sensor driver must implement the init() function')
          assert(typeof driver.ready === 'boolean', 'Sensor driver must implement the ready boolean state')

          // Save instance to driver cache
          driverCache[sensor.id] = driver
        }

        // Init sensor if needed
        if (!driver.ready) {
          await driver.init()
        }

        // Read sensor, calibrate value, store it and timestamp it
        sensor.raw = await driver.read()
        sensor.value = sensor.raw * (sensor?.calibration?.a || 1) + (sensor?.calibration?.b || 0)
        sensor.last = new Date().toISOString()
      } catch (error) {
        console.warn(`[readSensors] Error while trying to read sensor ${sensor.name}. Check the configuration. ${error.message || error}`)
      }
    }
  }
}
