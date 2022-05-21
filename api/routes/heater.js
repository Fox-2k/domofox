const express = require('express')
const state = require('../lib/state')
const router = express.Router()
const heater = require('../lib/heater')

/* GET heating */
router.get('/heating', (req, res, next) => {
  try {
    res.json({ result: true, value: heater.isHeating() })
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

module.exports = router
