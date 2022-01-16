const { randomUUID } = require('crypto')
const assert = require('assert')
const express = require('express')
const state = require('../state')
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
    if (!newSensorConfig.label) throw (new Error('New sensor : label property is missing'))

    // Assign an unique id
    newSensorConfig.id = randomUUID()
    newSensorConfig.created = new Date().toISOString()

    // Add it to config and answer with added sensor config
    state.config.sensors.push(newSensorConfig)
    state.save()
    res.json({ result: true, value: newSensorConfig })
  } catch (error) {
    res.status(500).json({ result: false, error: error.message || error })
  }
})

/**
 * Delete a sensor
 */
router.delete('/:id', (req, res, next) => {
  try {
    console.log(require('assert'))
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
    if (error instanceof assert.AssertionError) {
      res.status(400).json({ result: false, error: error.message })
    } else {
      res.status(500).json({ result: false, error: error.message })
    }
  }
})

module.exports = router
