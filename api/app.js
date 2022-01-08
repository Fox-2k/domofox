const express = require('express')
const logger = require('morgan')

const modeRouter = require('./routes/mode')

// Launch express web server
const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Define api routes
app.use('/api/mode', modeRouter)

module.exports = app
