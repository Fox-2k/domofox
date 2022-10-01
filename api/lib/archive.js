/**
 * ARCHIVE : Define one archive iteration
 * The exported function is intended to be launched periodically at archive period
 */

const assert = require('assert')
const state = require('./state')
const heater = require('./heater')
const traces = require('./traces')

module.exports = async function () {
  // Ensure last config is on memory
  await state.load()

  // TRACES
  if (!traces.ready) await traces.init()
  await traces.saveTrace(traces.codes.SP, state.config.setpoint ?? null)
  await traces.saveTrace(traces.codes.HEAT, state.config.heater.value ?? null)

  // Ensure there is at least one configured sensor
  assert(state.config.sensors.length > 0, 'No sensors defined, unable to trace sensor average value!')

  // Ensure there is at least one WORKING sensor
  const activeSensors = state.config.sensors.filter(s => s.active && s.value !== undefined)
  assert(activeSensors && activeSensors.length > 0, 'It seems that no sensor are working, unable to get values from them!')

  // Get weighted average of temperatures
  const tempAvg = activeSensors.reduce((c, v) => c + (v.weight || 1) * v.value, 0) / activeSensors.reduce((c, v) => c + (v.weight || 1), 0)

  await traces.saveTrace(traces.codes.AVG, tempAvg ?? null)

  return { mode: state.config.mode, heating: heater.heating, setpoint: state.config.setpoint ?? null, tempAvg, message: 'Archive done.' }
}
