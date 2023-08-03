const mongoose = require("mongoose")

const earningcodeSchema  = mongoose.Schema({
    
    code:{
        type:String,
        required:true,
        unique:true
    },
    codetype:{
        type:String,
        required:true,
        unique:true
    },
    description:{
         type:String,
         default:""
    } 
 
})

const ErCodes = mongoose.model('EarningCodes',earningcodeSchema)
module.exports = ErCodes;