const mongoose = require("mongoose")

const setupSchema  = mongoose.Schema({
    
   payrollname:{
     type:String,
     required:true
   }, 
   paycycle:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'PayCycle'  
   },
   

})

const Setup = mongoose.model('Setup',setupSchema)
module.exports = Setup;