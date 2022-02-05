/**
 * REGULATE : Define one regulation iteration
 * The exported function is intended to be launched periodically at each minutes
 * so the thermostat can regulate as intended
 */

const assert = require('assert')
const state = require('./state')
const heater = require('./heater')

const MODE_OFF = 0
const MODE_MANU = 1
const MODE_AUTO = 2
const MODE_FORCED = 3

const driverCache = {}

/**
 * Core basic regulation with positive and negative hysteresis
 * @param {Number} setpoint The set point to reach
 * @param {Number} temp The actual temperature
 */
async function coreRegulate (setpoint, temp) {
  // Heating conditions
  if (setpoint - temp >= state.config.hysteresis.pos) {
    await heater.switchState(true)
  }

  // Stopping conditions
  if (setpoint - temp <= state.config.hysteresis.neg * -1) {
    await heater.switchState(false)
  }
}

/**
 * Read all configured sensors to store their calibrated values
 */
async function readSensors () {
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

/**
 * Update the automatic setpoint according to the defined plannings
 * A time reached setpoint disable forced mode too, returning to auto mode
 */
function updateAutoSetPoint () {
  const dateNow = new Date(Date.now())
  for (const job of state.config.plannings) {
    if (job.active && job.time && !isNaN(job.time.hour) && !isNaN(job.time.min) && Array.isArray(job.days) && job.days.length === 7) {
      if (job.time.hour === dateNow.getHours() && job.time.min === dateNow.getMinutes() && !!job.days[dateNow.getDay()]) {
        // Update setpoint
        state.config.setpoint.auto = job.setpoint
        // If forced mode was on, this terminate its activity, returning to auto mode
        if (state.config.mode === MODE_FORCED) state.config.mode = MODE_AUTO
      }
    }
  }
}

module.exports = async function () {
  // Ensure last config is on memory
  await state.load()

  // Read all configured sensors
  await readSensors()

  // Update auto setpoint according to plannings
  updateAutoSetPoint()

  // OFF MODE
  if (state.config.mode === MODE_OFF) {
    heater.switchState(false)
    return { mode: state.config.mode, heating: heater.heating, message: 'Regulation is off.' }
  }

  // Ensure there is at least one configured sensor
  assert(state.config.sensors.length > 0, 'No sensors defined, unable to regulate something!')

  // Ensure there is at least one WORKING sensor
  assert(state.config.sensors.filter(s => s.active && s.value !== undefined).length > 0, 'It seems that no sensor are working, unable to get values from them!')

  // Get weighted average of temperatures
  const tempAvg = state.config.sensors.filter(s => s.active && s.value !== undefined).reduce((c, v) => c + (v.weight || 1) * v.value, 0) / state.config.sensors.length

  // MANUAL MODE
  if (state.config.mode === MODE_MANU) {
    // Regulate with manual setpoint
    await coreRegulate(state.config.setpoint.manu, tempAvg)

    // Return mode, heater state and message
    return { mode: state.config.mode, heating: heater.heating, message: 'Manual regulation done.' }
  }

  // AUTO MODE
  if (state.config.mode === MODE_AUTO) {
    // Regulate with automatic setpoint
    await coreRegulate(state.config.setpoint.auto, tempAvg)

    // Return mode, heater state and message
    return { mode: state.config.mode, heating: heater.heating, message: 'Automatic regulation done.' }
  }

  // FORCED MODE
  if (state.config.mode === MODE_FORCED) {
    // Regulate with forced setpoint
    await coreRegulate(state.config.setpoint.forced, tempAvg)

    // Return mode, heater state and message
    return { mode: state.config.mode, heating: heater.heating, message: 'Forced regulation done.' }
  }
}
