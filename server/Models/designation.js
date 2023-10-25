const mongoose = require("mongoose")
const designationSchema  = mongoose.Schema({
    title:{
        type:String,
        
    },
    // description:{
    //     type:String,  
    // },
    employees:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Employees'
   }]
})

const Designation = mongoose.model('Designation',designationSchema)
module.exports = Designation