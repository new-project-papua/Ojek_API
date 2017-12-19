const express = require('express')
const router = express.Router()
const dummyController = require('../controllers/dummyController')

router.get('/', dummyController.getAll)
router.post('/', dummyController.bulkRegister)
router.delete('/', dummyController.bulkDelete)

router.get('/driver', dummyController.getAllDriver)
router.post('/driver', dummyController.bulkRegisterDriver)
router.delete('/driver', dummyController.bulkDeleteDriver)

module.exports = router
