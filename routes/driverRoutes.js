const express = require('express')
const router = express.Router()
const driverController = require('../controllers/driverController')
const emailHelper = require('../helpers/registerHelper')

router.post('/changepassword/:_id', driverController.changePassword)
router.post('/register', emailHelper.isRegistered, driverController.register)
router.get('/verify', driverController.emailVerification)
router.post('/login', driverController.login)
router.get('/:_id', driverController.byId)
router.delete('/:_id', driverController.removeById)
router.put('/:_id', driverController.updateById)
router.get('/', driverController.all)

module.exports = router
