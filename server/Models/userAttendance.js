
const mongoose = require("mongoose");
const UserAttendanceSchema = new mongoose.Schema({
     month:{
        type:Date,
        default:Date.now()
     },
     employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employees'
     },
     date:{
        type:Date,
        required:true
     },
     in:{
        type:String,
        required:true
     },
     out:{
        type: String,
        default:""
     }
   
})


const UserAttendance = mongoose.model("UserAttendance",UserAttendanceSchema)
module.exports = UserAttendance;