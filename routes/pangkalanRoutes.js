const express = require('express')
const router = express.Router()
const pangkalanController = require('../controllers/pangkalanController')

router.get('/getobj/:_id', pangkalanController.getObjCoords)
router.get('/', pangkalanController.all)
router.get('/:_id', pangkalanController.byId)
router.post('/', pangkalanController.create)
router.delete('/:_id', pangkalanController.delete)
router.put('/:_id', pangkalanController.update)

module.exports = router
