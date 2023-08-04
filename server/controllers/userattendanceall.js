const userAttendance = require('../Models/userAttendance')
// const addShifts = require('../Models/shifts')
const allattendance = async(req,res,next) => {
    try{
         
        const userattendance = await userAttendance.find().populate('employeeId')
         userattendance && res.status(200).json({message:"success",userattendance});
    }catch(error){
       console.log(error)
      next(error)
    }
}

// const addShifts = async(req,res)=>{
//     const {shift_name,description,start_time,end_time,slaps}= req.body
//     try{
//         const shifts = await createShifts.create({shift_name,description,start_time,end_time,slaps})
//         res.status(200).json(shifts)  

//     }catch(error){
//         res.status(400).json({error:error.message})

//     }
// }

module.exports ={
    allattendance
}