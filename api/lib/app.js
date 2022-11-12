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
const tracesRouter = require('../routes/traces')
const deviceRouter = require('../routes/device')

// Launch express web server
const app = express()
if (process.env.SERVER_DEBUG) app.use(logger('dev'))
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
app.use('/api/traces', tracesRouter)
app.use('/api/device', deviceRouter)

module.exports = app
