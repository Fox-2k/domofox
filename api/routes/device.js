const { exec } = require('child_process')
const express = require('express')
const router = express.Router()

/* reboot device */
router.post('/reboot', (req, res, next) => {
  try {
    res.json({ result: true })
    setTimeout(() => exec('reboot now'), 1000)
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

/* shutdown device */
router.post('/shutdown', (req, res, next) => {
  try {
    res.json({ result: true })
    setTimeout(() => exec('shutdown now'), 1000)
  } catch (error) {
    res.status(500).json({ result: false, error: error.message })
  }
})

module.exports = router
