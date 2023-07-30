const { Router } = require('express')
const { getAllBoats } = require('./controller')

// create a new Router instance
const router = new Router()

// define routes
router.get('/', getAllBoats)

// exporting router
module.exports = router