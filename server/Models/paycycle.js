const mongoose = require("mongoose")

const paycycleSchema  = mongoose.Schema({   
   frequency:{
    type:String,
    required:true
   }
})

const PayCycle = mongoose.model('PayCycle',paycycleSchema)
module.exports = PayCycle;