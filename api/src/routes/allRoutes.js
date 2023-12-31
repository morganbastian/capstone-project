const { Router } = require('express')

// import routes
const root = require('./root/router')
const users = require('./users/router')
const bookings = require('./bookings/router')
const boats = require('./boats/router')
const timeslots = require('./timeslots/router')

// create a new Router instance
const allRouters = new Router()

// create base routes
allRouters.use('/', root)
allRouters.use('/users', users)
allRouters.use('/bookings', bookings)
allRouters.use('/boats', boats)
allRouters.use('/timeslots', timeslots)
// exporting router
module.exports = allRouters