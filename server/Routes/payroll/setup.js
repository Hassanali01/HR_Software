const express = require('express');
const router = express.Router();
const {createError} = require('../../Utils/CreateError')
const Setup = require('../../Models/payroll/setup')
router.post('/setup',async(req,res,next)=>{

    try{
          const setup = new  Setup({
            payrollname:req.body.payrollname,
            paycycle:req.body.paycycle,
            
          })

          const payrollsetup = await setup.save();
          save && res.status(200).json({message:"success",payrollsetup})
          
    }
    catch(error){

        next(error)
    }
});


router.get('/setup',async(req,res,next)=>{
    try{
         const setup = await Setup.find().populate('paycycle');
         setup && res.status(200).json({message:"success",setup})
    }catch(error){
        console.log(error)
    }
})

module.exports = router