const express = require('express')
const router = express.Router()
const dummyController = require('../controllers/dummyController')

router.get('/', dummyController.getAll)
router.post('/', dummyController.bulkRegister)
router.delete('/', dummyController.bulkDelete)

module.exports = router
