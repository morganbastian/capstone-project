const { Router } = require('express')
const { getAllBoats, updateBoat, showBoatById } = require('./controller')

// create a new Router instance
const router = new Router()

// define routes
router.get('/', getAllBoats)
router.get('/:id', showBoatById)
router.put('/update/:id', updateBoat)

// exporting router
module.exports = router