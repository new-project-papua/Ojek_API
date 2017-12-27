const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')

router.get('/', transactionController.all)
router.post('/', transactionController.create)

module.exports = router
