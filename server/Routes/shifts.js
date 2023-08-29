const express = require('express')
const {addShifts,allShifts,getSpecificShift,deleteShifts,updateShift,deleteSlabs} = require('../controllers/shiftsController')
const router = express.Router()

router.post('/addShifts',addShifts)
router.get('/allShifts',allShifts)
router.get('/:id',getSpecificShift)
router.delete('/:id',deleteShifts)
router.put('/:id', updateShift)
router.delete('/deleteslabs/:id',deleteSlabs)


module.exports = router