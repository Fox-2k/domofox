const assert = require('assert')
const express = require('express')
const router = express.Router()
const archive = require('../lib/archive')
const traces = require('../lib/traces')

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

/** GET archive : launch archive iteration */
router.get('/archive', async (req, res, next) => {
  try {
    res.json({ result: true, value: await archive() })
  } catch (error) {
    errorAnswer(error, res)
  }
})

/* GET trace */
router.get('/:code', async (req, res, next) => {
  try {
    assert(req.query && req.query.from, 'The "from" date must be provided in the url query')
    assert(req.query && req.query.to, 'The "to" date must be provided in the url query')

    if (!traces.ready) await traces.init()

    res.json({ result: true, value: await traces.getTrace(req.params.code, req.query.from, req.query.to, req.query.table) })
  } catch (error) {
    errorAnswer(error, res)
  }
})

module.exports = router
