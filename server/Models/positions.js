const mongoose = require("mongoose")
const departmentSchema  = mongoose.Schema({
    
    
    position:{
        type:String,
        required:true
    },
    assignTo:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Departments'
    }
})

const Positions = mongoose.model('Positions',departmentSchema)
module.exports = Positions