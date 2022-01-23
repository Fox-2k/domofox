const express = require('express')
const assert = require('assert')
const regulate = require('../lib/regulate')
const router = express.Router()

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
 * GET regulate : launch one regulation iteration
 */
router.get('/', async (req, res, next) => {
  try {
    res.json({ result: true, value: await regulate() })
  } catch (error) {
    errorAnswer(error, res)
  }
})

module.exports = router
