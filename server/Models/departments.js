const mongoose = require("mongoose")
const departmentSchema  = mongoose.Schema({
    departmentname:{
        type:String,
        
    },
    description:{
        type:String,
        
    },

    employees:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Employees'
   }]
    
})

const Department = mongoose.model('Departments',departmentSchema)
module.exports = Department