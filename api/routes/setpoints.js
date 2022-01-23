const express = require('express')
const state = require('../lib/state')
const router = express.Router()

const MINSETPOINT = 10
const MAXSETPOINT = 30

/* GET setpoint manu */
router.get('/manu', (req, res, next) => {
  try {
    res.json({ result: true, value: state.config.setpoint.manu })
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

/* PUT setpoint manu */
router.put('/manu', async (req, res, next) => {
  try {
    // mode value must be an integer between 0 and 2
    if (req.body && typeof req.body.value === 'number' && req.body.value >= MINSETPOINT && req.body.value <= MAXSETPOINT) {
      state.config.setpoint.manu = req.body.value
      await state.save()
      res.json({ result: true })
    } else {
      res.status(400).json({ result: false })
    }
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

/* GET setpoint auto */
router.get('/auto', (req, res, next) => {
  try {
    res.json({ result: true, value: state.config.setpoint.auto })
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

/* PUT setpoint auto */
router.put('/auto', async (req, res, next) => {
  try {
    // mode value must be an integer between 0 and 2
    if (req.body && typeof req.body.value === 'number' && req.body.value >= MINSETPOINT && req.body.value <= MAXSETPOINT) {
      state.config.setpoint.auto = req.body.value
      await state.save()
      res.json({ result: true })
    } else {
      res.status(400).json({ result: false })
    }
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

/* GET setpoint forced */
router.get('/forced', (req, res, next) => {
  try {
    res.json({ result: true, value: state.config.setpoint.forced })
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

/* PUT setpoint forced */
router.put('/forced', async (req, res, next) => {
  try {
    // mode value must be an integer between 0 and 2
    if (req.body && typeof req.body.value === 'number' && req.body.value >= MINSETPOINT && req.body.value <= MAXSETPOINT) {
      state.config.setpoint.forced = req.body.value
      await state.save()
      res.json({ result: true })
    } else {
      res.status(400).json({ result: false })
    }
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

module.exports = router
