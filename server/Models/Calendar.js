const mongoose = require("mongoose");
const AutoIncrement =  require('mongoose-sequence')(mongoose);
const calendarSchema = new mongoose.Schema({
      sr_no:Number,
      calendarname:{
        type:String,
        require:true
      },
     
      holidays:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Holidays'
      }
                     

},{timestamps:true})

calendarSchema.plugin(AutoIncrement, {inc_field: 'sr_no'});
const Calendar = mongoose.model("Calendar",calendarSchema)
module.exports = Calendar;