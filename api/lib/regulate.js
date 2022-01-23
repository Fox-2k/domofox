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

/**
 * Core basic regulation with positive and negative hysteresis
 * @param {Number} setpoint The set point to reach
 * @param {Number} temp The actual temperature
 */
function coreRegulate (setpoint, temp) {
  // Heating conditions
  if (setpoint - temp >= state.config.hysteresis.pos) {
    heater.switchState(true)
  }

  // Stopping conditions
  if (setpoint - temp <= state.config.hysteresis.neg * -1) {
    heater.switchState(false)
  }
}

/**
 * Update the automatic setpoint according to the defined plannings
 * A time reached setpoint disable forced mode too, returning to auto mode
 */
function updateAutoSetPoint () {
  const dateNow = new Date()
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

module.export = async function () {
  // Ensure last config is on memory
  await state.load()

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
  assert(state.config.sensors.filter(s => s.value !== undefined).length > 0, 'It seems that no sensor are working, unable to get values from them!')

  // Get weighted average of temperatures
  const tempAvg = state.config.sensors.reduce((c, v) => c + (c.weight || 1) * c.value, 0) / state.config.sensors.length

  // MANUAL MODE
  if (state.config.mode === MODE_MANU) {
    // Regulate with manual setpoint
    coreRegulate(state.config.setpoint.manu, tempAvg)

    // Return mode, heater state and message
    return { mode: state.config.mode, heating: heater.heating, message: 'Manual regulation done.' }
  }

  // AUTO MODE
  if (state.config.mode === MODE_AUTO) {
    // Regulate with manual setpoint
    coreRegulate(state.config.setpoint.auto, tempAvg)

    // Return mode, heater state and message
    return { mode: state.config.mode, heating: heater.heating, message: 'Automatic regulation done.' }
  }

  // FORCED MODE
  if (state.config.mode === MODE_FORCED) {
    // Regulate with manual setpoint
    coreRegulate(state.config.setpoint.forced, tempAvg)

    // Return mode, heater state and message
    return { mode: state.config.mode, heating: heater.heating, message: 'Forced regulation done.' }
  }
}
