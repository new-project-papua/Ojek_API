const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')
const emailHelper = require('../helpers/registerHelper')

router.get('/', indexController.sendMessage)
router.post('/register', emailHelper.isRegistered, indexController.register)
router.get('/verify', indexController.emailVerification)
router.post('/login', indexController.login)

module.exports = router
