const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')
const emailHelper = require('../helpers/emailHelper')

router.get('/', indexController.sendMessage)
router.post('/register', emailHelper.isRegistered, indexController.register)

module.exports = router
