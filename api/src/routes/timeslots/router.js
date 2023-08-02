const { Router } = require('express')
const { getAllTimeslots } = require('./controller')

// create a new Router instance
const router = new Router()

// define routes
router.get('/', getAllTimeslots)

// exporting router
module.exports = router