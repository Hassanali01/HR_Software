const express = require('express');
const router = express.Router();
const {createError} = require('../../Utils/CreateError')
const Period = require('../../Models/payroll/payperiod')
router.post('/payperiod',async(req,res,next)=>{

    try{
          const payperiod = new Period({
            paycycle:req.body.paycycle,
            start:req.body.start,
            end:req.body.end
          })
         const pperiod = await payperiod.save();
         pperiod && res.status(200).json({message:"successfully added pay period",pperiod})
    }
    catch(error){
         next(error)
    }
})

router.get('/payperiod',async(req,res,next)=>{
    try{
          const payperiod = await Period.find().populate('paycycle');
          payperiod  && res.status(200).json({message:"success", payperiod})
    }catch(error){
        next(error)
    }
})
router.get('/payperiod/:id',async(req,res,next)=>{
    try{
          const payperiod = await Period.findById(req.params.id);
          payperiod  && res.status(200).json({message:"success", payperiod})
    }catch(error){
        next(error)
    }
})

module.exports=router