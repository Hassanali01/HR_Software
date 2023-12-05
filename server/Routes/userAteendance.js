const express = require("express");
const router = express.Router();
const { json } = require("body-parser");
const Attendance = require('../Models/attendance')
const {verifyAdmin} = require('../Utils/verify')
const {allattendance} = require('../controllers/userattendanceall')
// router.get('/userattendance',verifyAdmin,allattendance)



router.get('/attendance/employee',async(req,res,next)=>{

    console.log("params", req.query)

    try{
        const userattendance = await Attendance.find({employee: req.query.id, 
            $expr: {
              $and: [
                {
                  "$eq": [
                    {
                      "$month": "$date"
                    },
                    req.query.month
                  ]
                },
                {
                  "$eq": [
                    {
                      "$year": "$date"
                    },
                    req.query.year
                  ]
                }
              ]
            }
          })
         userattendance && res.status(200).json({message:"success",userattendance});
    }catch(error){
      next(error)
    }
})




router.post('/userattendance', async (req, res,next) => { 
    try {    
        const userattendance = new Attendance({
            month:req.body.month,
            employeeId:req.body.employeeId,
            date:req.body.date,
            In:req.body.In,
            out:req.body.out   
        })
        const attendance = await userattendance.save();
        attendance && res.status(200).json({message:'Successfully posted ',attendance})
    } catch (err) {
       next(err)  
    }
})




router.put('/userattendance/:id', async (req, res,next) => {
    try {
        const userattendance = await Attendance.findByIdAndUpdate(req.params.id,{
          $set:{ out:req.body.out }
        },{new:true})
        userattendance && res.status(200).json({message:'Successfully updated ',userattendance})
    } catch (error) {
       next(error)
    }
})




module.exports = router