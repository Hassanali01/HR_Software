const express = require('express');
const router = express.Router();
const {createError} = require('../../Utils/CreateError')
const Period = require('../../Models/payroll/payperiod')
const Paycycle = require('../../Models/payroll/paycycle.js')
router.post('/paycycle',async(req,res,next)=>{

    try{
           console.log("before try")
           const cycle = new Paycycle({
                frequency:req.body.frequency
           })
           const save = await cycle.save();
           save && res.status(200).json({message:"success",save})
          console.log("in try")
    }
    catch(error){
         next(error)
    }
})

router.get('/paycycle',async(req,res,next)=>{
    try{
         const paycycle = await Paycycle.find();
         paycycle && res.status(200).json({message:"success",paycycle})
    }catch(error){
        next(error)
    }
})

module.exports = router