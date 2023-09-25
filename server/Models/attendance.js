const mongoose = require("mongoose");
const AttendanceSchema = new mongoose.Schema({
   employee: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Employees'
   },
   month: {
      type: String
   },
   Employee_Id: {
     type: String 
   },
   Name: {
      type: String
   },
   date: {
      type: Date
   },
   in: {
      type: String
   },
   out: {
      type: String
   },
   status: {
      type: String
   }

},{timestamps:true})
AttendanceSchema.index({employee:1, date:1},{unique:true});

const Attendance = mongoose.model("attendances",AttendanceSchema)
module.exports = Attendance;