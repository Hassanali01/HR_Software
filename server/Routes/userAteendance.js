const express = require("express");
const router = express.Router();
const {createError} = require('../Utils/CreateError')
const { json } = require("body-parser");
const userAttendance = require('../Models/userAttendance')
const {verifyAdmin} = require('../Utils/verify')
const {allattendance} = require('../controllers/userattendanceall')
router.get('/userattendance',verifyAdmin,allattendance)
router.get('/userattendance/:id',async(req,res,next)=>{
    try{
        const userattendance = await userAttendance.find().populate('employeeId')
         userattendance && res.status(200).json({message:"success",userattendance});
    }catch(error){
       console.log(error)
      next(error)
    }
})

router.post('/userattendance', async (req, res,next) => {
   
    try {
        
        const userattendance = new userAttendance({
            month:req.body.month,
            employeeId:req.body.employeeId,
            date:req.body.date,
            In:req.body.In,
            out:req.body.out   
        })
        const attendance = await userattendance.save();
        attendance && res.status(200).json({message:'Successfully posted ',attendance})
    } catch (err) {
        console.log(err)
       next(err)
    }

})
router.put('/userattendance/:id', async (req, res,next) => {
   
    try {
        // firstname: req.body.firstname,
        // lastname: req.body.lastname,
        const userattendance = await userAttendance.findByIdAndUpdate(req.params.id,{
          $set:{ out:req.body.out }
          
        },{new:true})
        userattendance && res.status(200).json({message:'Successfully updated ',userattendance})
    } catch (error) {
        console.log(error)
       next(error)
    }

})




module.exports = router