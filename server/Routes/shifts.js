const express = require('express')
const {addShifts,allShifts,getSpecificShift,deleteShifts} = require('../controllers/shiftsController')
const router = express.Router()

router.post('/addShifts',addShifts)
router.get('/allShifts',allShifts)
router.get('/:id',getSpecificShift)
router.delete('/:id',deleteShifts)

module.exports = router