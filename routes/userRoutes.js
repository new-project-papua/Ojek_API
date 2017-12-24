const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const emailHelper = require('../helpers/registerHelper')

router.post('/changepassword/:_id', userController.changePassword)
router.post('/register', emailHelper.isRegistered, userController.register)
router.get('/verify', userController.emailVerification)
router.post('/login', userController.login)
router.get('/:_id', userController.byId)
router.put('/:_id', userController.updateById)
router.delete('/:_id', userController.removeById)
router.get('/', userController.all)

module.exports = router
