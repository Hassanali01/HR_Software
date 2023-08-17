const mongoose = require("mongoose")

const setupSchema  = mongoose.Schema({
   title:{
     type:String,
     required:true
   }, 
   npd_formula:{
      type:String,
      required:true  
   },
})

const Setup = mongoose.model('payroll-setup',setupSchema)
module.exports = Setup;