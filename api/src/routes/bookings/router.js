const { Router } = require('express')
const { createNewBooking, showAllBookings, showBookingById, showBookingByUserId, updateUserBookings, deleteUserBooking } = require('./controller')

//import middleware
const { authenticate } = require('../../middleware/auth')

// create a new Router instance
const router = new Router()

// define routes
router.get('/:id', showBookingById)
router.post('/new', createNewBooking)
router.get('/', showAllBookings)
router.get('/userid/:userId', showBookingByUserId)
router.put('/update/:id', authenticate, updateUserBookings)
router.delete('/delete/:id', authenticate, deleteUserBooking)

// exporting router
module.exports = router