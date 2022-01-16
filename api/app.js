const express = require('express')
const logger = require('morgan')

const modeRouter = require('./routes/mode')
const hysteresisRouter = require('./routes/hysteresis')
const setpointRouter = require('./routes/setpoint')
const sensorRouter = require('./routes/sensor')

// Launch express web server
const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Define api routes
app.use('/api/mode', modeRouter)
app.use('/api/hysteresis', hysteresisRouter)
app.use('/api/setpoint', setpointRouter)
app.use('/api/sensor', sensorRouter)

module.exports = app
