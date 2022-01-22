const express = require('express')
const logger = require('morgan')

const modeRouter = require('./routes/mode')
const hysteresisRouter = require('./routes/hysteresis')
const setpointsRouter = require('./routes/setpoints')
const sensorsRouter = require('./routes/sensors')

// Launch express web server
const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Define api routes
app.use('/api/mode', modeRouter)
app.use('/api/hysteresis', hysteresisRouter)
app.use('/api/setpoints', setpointsRouter)
app.use('/api/sensors', sensorsRouter)

module.exports = app
