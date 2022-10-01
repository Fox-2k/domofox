/**
 * REGULATE : Define one regulation iteration
 * The exported function is intended to be launched periodically
 * so the thermostat can regulate as intended
 */

const assert = require('assert')
const state = require('./state')
const heater = require('./heater')
const sensors = require('./sensors')

const MODE_OFF = 0
// const MODE_MANU = 1
const MODE_AUTO = 2

/**
 * Core basic regulation with positive and negative hysteresis
 * @param {Number} setpoint The set point to reach
 * @param {Number} temp The actual temperature
 */
async function coreRegulate (setpoint, temp) {
  if (setpoint - temp <= state.config.hysteresis.neg * -1) {
    // Stopping conditions
    await heater.switchState(false)
  } else if (setpoint - temp >= state.config.hysteresis.pos) {
    // Heating conditions
    await heater.switchState(true)
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
        state.config.setpoint = job.setpoint
        // If forced mode was on, this terminate its activity, returning to auto mode
        // if (state.config.mode === MODE_FORCED) state.config.mode = MODE_AUTO
      }
    }
  }
}

module.exports = async function () {
  // Ensure last config is on memory
  await state.load()

  // Read all configured sensors
  await sensors.readSensors()

  // AUTO MODE
  if (state.config.mode === MODE_AUTO) {
    // Update auto setpoint according to plannings
    updateAutoSetPoint()
  }

  // Ensure new state is saved !
  await state.save()

  let tempAvg = null

  try {
    // Ensure there is at least one configured sensor
    assert(state.config.sensors.length > 0, 'No sensors defined, unable to regulate something!')

    // Ensure there is at least one WORKING sensor
    const activeSensors = state.config.sensors.filter(s => s.active && s.value !== undefined)
    assert(activeSensors && activeSensors.length > 0, 'It seems that no sensor are working, unable to get values from them!')

    // Get weighted average of temperatures
    tempAvg = activeSensors.reduce((c, v) => c + (v.weight || 1) * v.value, 0) / activeSensors.reduce((c, v) => c + (v.weight || 1), 0)

    if (state.config.mode === MODE_OFF) {
      // OFF MODE

      heater.switchState(false)
      return { mode: state.config.mode, heating: heater.heating, message: 'Regulation is off.' }
    } else {
      // REGULATION

      // Regulate with general setpoint
      await coreRegulate(state.config.setpoint, tempAvg)

      // Return mode, heater state and message
      return { mode: state.config.mode, heating: heater.heating, message: 'Regulation done.' }
    }
  } catch (error) {
    // We could not read average temperature, stop heater by security
    heater.switchState(false)
    throw error
  }
}
