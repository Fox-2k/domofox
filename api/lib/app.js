const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const modeRouter = require('../routes/mode')
const hysteresisRouter = require('../routes/hysteresis')
const setpointsRouter = require('../routes/setpoints')
const sensorsRouter = require('../routes/sensors')
const planningsRouter = require('../routes/plannings')
const regulateRouter = require('../routes/regulate')
const heaterRouter = require('../routes/heater')

// Launch express web server
const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Define api routes
app.use('/api/mode', modeRouter)
app.use('/api/hysteresis', hysteresisRouter)
app.use('/api/setpoint', setpointsRouter)
app.use('/api/sensors', sensorsRouter)
app.use('/api/plannings', planningsRouter)
app.use('/api/regulate', regulateRouter)
app.use('/api/heater', heaterRouter)

module.exports = app
