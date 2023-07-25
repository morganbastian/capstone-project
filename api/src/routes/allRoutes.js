const { Router } = require('express')

// import routes
const root = require('./root/router')
// const users = require('./users/router')
// const reports = require('./reports/router')
// const crimes = require('./crimes/router')

// create a new Router instance
const allRouters = new Router()

// create base routes
allRouters.use('/', root)
// allRouters.use('/users', users)
// allRouters.use('/reports', reports)
// allRouters.use('/crimes', crimes)

// exporting router
module.exports = allRouters