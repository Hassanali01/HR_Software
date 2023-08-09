const userAttendance = require('../Models/userAttendance')
const allattendance = async(req,res,next) => {
    try{
        const userattendance = await userAttendance.find().populate('employeeId')
         userattendance && res.status(200).json({message:"success",userattendance});
    }catch(error){
      next(error)
    }
}

module.exports ={
    allattendance
}