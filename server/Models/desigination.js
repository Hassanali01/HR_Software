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

const Designation = mongoose.model('Desigination',designationSchema)
module.exports = Designation