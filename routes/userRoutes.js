const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const emailHelper = require('../helpers/registerHelper')

router.get('/', userController.all)
router.get('/:_id', userController.byId)
router.post('/register', emailHelper.isRegistered, userController.register)
router.get('/verify', userController.emailVerification)
router.post('/login', userController.login)

module.exports = router
