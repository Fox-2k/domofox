const { randomUUID } = require('crypto')
const assert = require('assert')
const express = require('express')
const state = require('../lib/state')
const router = express.Router()

const _newDefaultSensor = {
  id: '',
  label: '',
  driver: 'spi.js',
  params: {},
  weight: 1,
  calibration: {
    a: 1,
    b: 0
  },
  active: true,
  created: ''
}

/**
 * Handle error on queries below and answer to client
 * @param {Error} error error object
 * @param {Object} res router response object
 */
function errorAnswer (error, res) {
  if (error instanceof assert.AssertionError) {
    res.status(200).json({ result: false, error: error.message })
  } else {
    res.status(500).json({ result: false, error: error.message })
  }
}

/**
 * Create a new sensor
 */
router.post('/', (req, res, next) => {
  try {
    // Create a new default sensor configuration and overwrite provided properties
    const newSensorConfig = {
      ...JSON.parse(JSON.stringify(_newDefaultSensor)),
      ...req.body
    }

    // Ensure label name is provided
    assert(newSensorConfig.label, 'New sensor : label property is missing')

    // Assign an unique id
    newSensorConfig.id = randomUUID()
    newSensorConfig.created = new Date().toISOString()

    // Add it to config and answer with added sensor config
    state.config.sensors.push(newSensorConfig)
    state.save()
    res.json({ result: true, value: newSensorConfig })
  } catch (error) {
    errorAnswer(error, res)
  }
})

/**
 * Delete a sensor
 */
router.delete('/:id', (req, res, next) => {
  try {
    // Sensor id must be provided
    assert(req.params && req.params.id, 'The uuid of sensor to delete must be provided in the url')
    const indexToDelete = state.config.sensors.findIndex(s => s.id === req.params.id)

    // Sensor config must be found
    assert(indexToDelete !== -1, 'Sensor to delete not found, was it already deleted?')

    // Delete sensor from config
    const deletedSensors = state.config.sensors.splice(indexToDelete, 1)
    state.save()
    res.json({ result: true, value: deletedSensors[0] })
  } catch (error) {
    errorAnswer(error, res)
  }
})

/**
 * Update a sensor configuration
 */
router.put('/:id', (req, res, next) => {
  try {
    // Sensor id must be provided
    assert(req.params && req.params.id, 'The uuid of sensor to update must be provided in the url')
    const sensorToUpdate = state.config.sensors.find(s => s.id === req.params.id)

    // Sensor config must be found
    assert(sensorToUpdate, 'Sensor to update not found, was it already deleted?')

    // Update sensor config
    sensorToUpdate.label = typeof req.body.label === 'string' ? req.body.label : sensorToUpdate.label
    sensorToUpdate.driver = typeof req.body.driver === 'string' ? req.body.driver : sensorToUpdate.driver
    sensorToUpdate.params = typeof req.body.params === 'object' ? req.body.params : sensorToUpdate.params
    sensorToUpdate.weight = typeof req.body.weight === 'number' ? req.body.weight : sensorToUpdate.weight
    sensorToUpdate.calibration.a = typeof req.body.calibration?.a === 'number' ? req.body.calibration.a : sensorToUpdate.calibration.a
    sensorToUpdate.calibration.b = typeof req.body.calibration?.b === 'number' ? req.body.calibration.b : sensorToUpdate.calibration.b
    sensorToUpdate.active = typeof req.body.active === 'boolean' ? req.body.active : sensorToUpdate.active
    sensorToUpdate.updated = new Date().toISOString()
    state.save()

    res.json({ result: true, value: sensorToUpdate })
  } catch (error) {
    errorAnswer(error, res)
  }
})

/**
 * Get weighted average of temperatures
 */
router.get('/average', (req, res, next) => {
  try {
    // At least 1 active sensor must be defined
    const activeSensors = state.config.sensors.filter(s => s.active && s.value !== undefined)
    assert(activeSensors && activeSensors.length > 0, 'No current active sensor found, average unavailable !')

    // Get weighted average of temperatures
    const tempAvg = activeSensors.reduce((c, v) => c + (v.weight || 1) * v.value, 0) / activeSensors.reduce((c, v) => c + (v.weight || 1), 0)

    res.json({ result: true, value: tempAvg })
  } catch (error) {
    errorAnswer(error, res)
  }
})

/**
 * Get a sensor configuration
 */
router.get('/:id', (req, res, next) => {
  try {
    // Sensor config must be found
    const sensor = state.config.sensors.find(s => s.id === req.params.id)
    assert(sensor, 'Sensor to get not found, was it already deleted?')

    res.json({ result: true, value: sensor })
  } catch (error) {
    errorAnswer(error, res)
  }
})

/**
 * Get all sensors
*/
router.get('/', (req, res, next) => {
  try {
    res.json({ result: true, value: state.config.sensors })
  } catch (error) {
    errorAnswer(error, res)
  }
})

module.exports = router
