const express = require('express')
const state = require('../state')
const router = express.Router()

/* GET mode */
router.get('/', (req, res, next) => {
  try {
    res.json({ result: true, value: state.config.mode })
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

/* PUT mode */
router.put('/', async (req, res, next) => {
  try {
    // mode value must be an integer between 0 and 2
    if (req.body && (req.body.value === 0 || req.body.value === 1 || req.body.value === 2)) {
      state.config.mode = req.body.value
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
