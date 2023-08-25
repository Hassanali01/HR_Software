const express = require('express');
const router = express.Router();
const {createError} = require('../../Utils/CreateError')
const Setup = require('../../Models/payroll/setup')


router.post('/',async(req,res,next)=>{
    try{
          const setup = new Setup({
            title:req.body.title,
            npd_formula:req.body.npd_formula, 
            applyGazettedHoliday: req.body.applyGazettedHoliday 
          })
          const payrollsetup = await setup.save();
          save && res.status(200).json({message:"success", payrollsetup})
    }
    catch(error){

        console.log("error in payroll setup", error)

        next(error)
    }
});


router.get('/',async(req,res,next)=>{
    try{
         const setup = await Setup.find();
         setup && res.status(200).json(setup)
    }catch(error){
    }
})



module.exports = router