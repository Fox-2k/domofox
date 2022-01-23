const { randomUUID } = require('crypto')
const assert = require('assert')
const express = require('express')
const state = require('../state')
const router = express.Router()

const MINSETPOINT = 10
const MAXSETPOINT = 30

const _newDefaultPlanning = {
  id: '',
  label: '',
  active: false,
  time: {
    hour: null,
    min: null
  },
  days: [true, true, true, true, true, true, true],
  setpoint: 18,
  preset: ''
}

/**
 * Handle error on queries below and answer to client
 * @param {Error} error error object
 * @param {Object} res router response object
 */
function errorAnswer (error, res) {
  if (error instanceof assert.AssertionError) {
    res.status(400).json({ result: false, error: error.message })
  } else {
    res.status(500).json({ result: false, error: error.message })
  }
}

/**
 * Create a new planning
 */
router.post('/', (req, res, next) => {
  try {
    // Create a new default planning and overwrite provided properties
    const newPlanning = {
      ...JSON.parse(JSON.stringify(_newDefaultPlanning)),
      ...req.body
    }

    // Ensure time is provided
    assert(newPlanning.time && newPlanning.time.hour >= 0 && newPlanning.time.hour < 24 && parseInt(newPlanning.time.hour) === newPlanning.time.hour, 'New planning : you must provide a valid time with hour and minute value')
    assert(newPlanning.time && newPlanning.time.min >= 0 && newPlanning.time.min < 24 && parseInt(newPlanning.time.min) === newPlanning.time.min, 'New planning : you must provide a valid time with hour and minute value')

    // Assign an unique id
    newPlanning.id = randomUUID()
    newPlanning.created = new Date().toISOString()

    // Add it to config and answer with added planning
    state.config.plannings.push(newPlanning)
    state.save()
    res.json({ result: true, value: newPlanning })
  } catch (error) {
    errorAnswer(error, res)
  }
})

/**
 * Delete a planning
 */
router.delete('/:id', (req, res, next) => {
  try {
    // Planning config must be found
    const indexToDelete = state.config.plannings.findIndex(s => s.id === req.params.id)
    assert(indexToDelete !== -1, 'Planning to delete not found, was it already deleted?')

    // Delete planning from config
    const deletedPlannings = state.config.plannings.splice(indexToDelete, 1)
    state.save()
    res.json({ result: true, value: deletedPlannings[0] })
  } catch (error) {
    errorAnswer(error, res)
  }
})

/**
 * Update a planning
 */
router.put('/:id', (req, res, next) => {
  try {
    // Planning config must be found
    const planningToUpdate = state.config.plannings.find(s => s.id === req.params.id)
    assert(planningToUpdate, 'Planning to update not found, was it already deleted?')

    // Check time validity if specified
    if (req.body.time) {
      assert(req.body.time.hour >= 0 && req.body.time.hour < 24 && parseInt(req.body.time.hour) === req.body.time.hour, 'Time specified is not valid')
      assert(req.body.time.min >= 0 && req.body.time.min < 24 && parseInt(req.body.time.min) === req.body.time.min, 'Time specified is not valid')
    }

    // Check days validity if specified
    if (req.days) {
      assert(Array.isArray(req.days) && req.days.length === 7, 'days activity are not valid, they must be send as an array of 7 booleans')
      assert(req.days.reduce((c, v) => c && typeof v === 'boolean', true), 'days activity are not valid, they must be send as an array of 7 booleans')
    }

    // Check setpoint validity
    if (req.setpoint) {
      assert(typeof req.body.setpoint === 'number' && req.body.setpoint >= MINSETPOINT && req.body.setpoint <= MAXSETPOINT, `Setpoint must be between ${MINSETPOINT}°C and ${MAXSETPOINT}°C`)
    }

    // Update planning
    planningToUpdate.label = typeof req.body.label === 'string' ? req.body.label : planningToUpdate.label
    planningToUpdate.active = typeof req.body.active === 'boolean' ? req.body.active : planningToUpdate.active
    planningToUpdate.time.hour = req.body.time ? req.body.time.hour : planningToUpdate.time.hour
    planningToUpdate.time.min = req.body.time ? req.body.time.min : planningToUpdate.time.min
    planningToUpdate.days = req.body.days || planningToUpdate.days
    planningToUpdate.setpoint = typeof req.body.setpoint === 'number' ? req.body.setpoint : planningToUpdate.setpoint
    planningToUpdate.preset = typeof req.body.preset === 'string' ? req.body.preset : planningToUpdate.preset
    planningToUpdate.updated = new Date().toISOString()
    state.save()

    res.json({ result: true, value: planningToUpdate })
  } catch (error) {
    errorAnswer(error, res)
  }
})

/**
 * get a planning
 */
router.get('/:id', (req, res, next) => {
  try {
    const planning = state.config.plannings.find(s => s.id === req.params.id)
    assert(planning, 'Planning to get not found, was it already deleted?')

    res.json({ result: true, value: planning })
  } catch (error) {
    errorAnswer(error, res)
  }
})

/**
 * Get all plannings
 */
router.get('/', (req, res, next) => {
  try {
    res.json({ result: true, value: state.config.plannings })
  } catch (error) {
    errorAnswer(error, res)
  }
})

module.exports = router
