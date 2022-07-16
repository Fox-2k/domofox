const express = require('express')
const state = require('../lib/state')
const router = express.Router()

/* GET positive hysteresis */
router.get('/pos', (req, res, next) => {
  try {
    res.json({ result: true, value: state.config.hysteresis.pos })
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

/* GET negative hysteresis */
router.get('/neg', (req, res, next) => {
  try {
    res.json({ result: true, value: state.config.hysteresis.neg })
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

/* PUT positive hysteresis */
router.put('/pos', async (req, res, next) => {
  try {
    // hysteresis value must be an absolute value
    if (req.body && typeof req.body.value === 'number' && req.body.value >= 0) {
      state.config.hysteresis.pos = req.body.value
      await state.save()
      res.json({ result: true, value: state.config.hysteresis.pos })
    } else {
      res.status(400).json({ result: false })
    }
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

/* PUT negative hysteresis */
router.put('/neg', async (req, res, next) => {
  try {
    // hysteresis value must be an absolute value
    if (req.body && typeof req.body.value === 'number' && req.body.value >= 0) {
      state.config.hysteresis.neg = req.body.value
      await state.save()
      res.json({ result: true, value: state.config.hysteresis.neg })
    } else {
      res.status(400).json({ result: false })
    }
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

module.exports = router
